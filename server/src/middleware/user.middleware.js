
import  jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";


export const isLoggedIn = async (req, _res, next) => {
    try {
        const {token} = req.cookies;
        // console.log("token", token);

        if (!token) {
            return next (new ApiError(400, "Unauthorized request"));
        }

        // token is available
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decodedtoken", decodedtoken);

        // const user = await User.findById(decodedtoken?._id);

        if (!decodedtoken) {
            return next (new ApiError(400, "Invalid access Token"));
        }
        
        req.user = decodedtoken;
        next();
    } catch (error) {
        return next (new ApiError(400,error?.message || "Invalid access Token"));

    }
}


// Middleware to check if user is admin or not
export const authorizedRoles = (...roles) => async (req, _res, next) => {

    const currentUserRoles = req.user.role;
    // console.log("currentUserRoles", currentUserRoles);

    if (!roles.includes(currentUserRoles)) {
        return next (new ApiError(400, "You do not have permission to access this route"))
    }
    next();

} 

// Middleware to check if user has an active subscription or not
export const authorizedSubscriber = async (req, _res, next) => {
    const subscription = req.user.subscription.status;
    console.log("subscription.middleware", req.user.subscription);
    const currentUserRoles = req.user.role;
    console.log("middleware", currentUserRoles);

    // If user is not admin or does not have an active subscription then error else pass
    if (currentUserRoles === 'USER' && subscription === 'created') {
        return next (new ApiError(403, "Please subscribe to access this route"))
    }
    next();
}