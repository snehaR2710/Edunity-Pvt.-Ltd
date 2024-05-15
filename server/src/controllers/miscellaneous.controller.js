import User from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import sendEmail from "../utils/sendemail.js";


//  @ROUTE @POST {{URL}}/api/v1/contact
//  @ACCESS Public
export const contactUs = async (req, res, next) => {
    const {name, email, message} = req.body;

    if (!(name || email || message)) {
        return next (new ApiError(400, 'Name, Email, Message are required'))
    }

    try {
        const subject = 'Contact Us Form';
        const textMessage = `${name} - ${email} <br /> ${message}`;

        await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage)
        
    } catch (error) {
        console.log(error);
        return next(new ApiError(error.message, 400));
    }

    res.status(200).json({
        success: true,
        message: 'Your request has been submitted successfully',
    });
}

//  @ROUTE @GET {{URL}}/api/v1/admin/stats/users
//  @ACCESS Private(ADMIN ONLY)
export const userStats = async (_req, res, _next) => {
    const allUserCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        'subscription.status': 'active', // subscription.status means we are going inside an object and we have to put this in quotes
    });

    res.status(200).json({
        success: true,
        message: 'All registered users count',
        allUserCount,
        subscribedUsersCount,
    });

}