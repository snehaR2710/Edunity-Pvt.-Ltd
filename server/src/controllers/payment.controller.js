// import Payment from "../models/payment.model.js";
import crypto from "crypto";
import { ApiError } from "../utils/error.js";
import User from "../models/user.model.js";
import { razorpay } from "../../index.js";
import Payment from "../models/payment.model.js";

const getRazorpayApiKey = async (_req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

/**
 * @ACTIVATE_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/subscribe
 * @ACCESS Private (Logged in user only)
 */
const buySubscription = async (req, res, next) => {
  try {
    // Extracting ID from request obj
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(400, "Unauthorized, Please login"));
    }

    // Checking the user role
    if (user.role === "ADMIN") {
      return next(new ApiError(400, "ADMIN cannot purchase a subscription"));
    }

    console.log("before subscription", user.subscription);
    // Creating a subscription using razorpay that we imported from the server
    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 5,
    });
    console.log("Subscription Created:", subscription);

    // Adding the ID and the status to the user account
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    console.log("before save", user);

    await user.save();

    console.log("after save", user);

    res.status(200).json({
      success: true,
      message: "subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return next(
      new ApiError(500, error.message || "You are not subscriberd!!")
    );
  }
};

/**
 * @VERIFY_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/verify
 * @ACCESS Private (Logged in user only)
 */
const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    // if (
    //   !razorpay_payment_id ||
    //   !razorpay_signature ||
    //   !razorpay_subscription_id
    // ) {
    //   return next(new ApiError(400, "All fields are required"));
    // }

    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(400, "Unauthorized, Please login"));
    }

    // Getting the subscription ID from the user object
    const subscriptionId = user.subscription.id;

    console.log("subscriptionId", subscriptionId);

    // Generating a signature with SHA256 for verification purposes
    // Here the subscriptionId should be the one which we saved in the DB
    // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
    // At the end convert it to Hex value
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id} | ${subscriptionId}`)
      .digest("hex");

    console.log("generatedSignature", generatedSignature);

    // Check if generated signature and signature received from the frontend is the same or not
    if (generatedSignature !== razorpay_signature) {
      return next(new ApiError(400, "Payment not verified, Please try again"));
    }

    // If they match create payment and store it in the DB
    const signature = await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    console.log("signature", signature);

    // Update the user subscription status to active (This will be created before this)
    user.subscription.status = "active";
    console.log("active", user.subscription.status);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log("verification Failed", error);
    return next(new ApiError(500, error.message));
  }
};

/**
 * @CANCEL_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/unsubscribe
 * @ACCESS Private (Logged in user only)
 */
const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(400, "Unauthorized, Please login"));
    }

    if (user.role === "ADMIN") {
      return next(new ApiError(400, "ADMIN cannot purchase a subscription"));
    }

    // Finding subscription ID from subscription
    const subscriptionId = user.subscription.id;

    // Creating a subscription using razorpay that we imported from the server
    try {
      const subscription = await razorpay.subscriptions.cancel(subscriptionId);

      // Adding the subscription status to the user account
      user.subscription.status = subscription.status;

      await user.save();
    } catch (error) {
      // Returning error if any, and this error is from razorpay so we have statusCode and message built in
      return next(new ApiError(error.error.description, error.statusCode));
    }

    // Finding the payment using the subscription ID
    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    // Getting the time from the date of successful payment (in milliseconds)
    const timeSinceSubscribed = Date.now() - payment.createdAt;

    // refund period which in our case is 14 days
    const refundPeriod = 14 * 24 * 60 * 60 * 1000;

    // Check if refund period has expired or not
    if (refundPeriod <= timeSinceSubscribed) {
      return next(
        new ApiError(
          400,
          "Refund period is over, so there will not be any refunds provided."
        )
      );
    }

    // If refund period is valid then refund the full amount that the user has paid
    await razorpay.payments.refund(payment.razorpay_payment_id, {
      speed: "optimum", // This is required
    });

    user.subscription.id = undefined; // Remove the subscription ID from user DB

    await user.save();
    await payment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @GET {{URL}}/api/v1/payments
 * @ACCESS Private (ADMIN only)
 */
const allPayment = async (req, res, next) => {
  try {
    const { count, skip } = req.query;

    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // If skip is sent then use that else default to 0
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthInNumbers = new Date(payment.start_at * 1000);

      return monthNames[monthInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthNames) => {
      monthlySalesRecord.push(finalMonths[monthNames]);
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayment,
};
