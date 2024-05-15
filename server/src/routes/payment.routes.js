import { Router } from "express";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middleware/user.middleware.js";
import { allPayment, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";


const router = Router();

router.route("/razopay-key").get(isLoggedIn, authorizedSubscriber, getRazorpayApiKey);

router.route("/subscribe").get(isLoggedIn, buySubscription);

router.route("/verify").post(isLoggedIn, verifySubscription);

router.route("/unsubscribe").post(isLoggedIn, cancelSubscription);

router.route("/").get(isLoggedIn, authorizedRoles("ADMIN"), allPayment);

export default router;
