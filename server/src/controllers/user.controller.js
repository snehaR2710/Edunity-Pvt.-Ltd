import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import crypto from "crypto";
import { ApiError } from "../utils/error.js";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendemail.js";


const cookieOptions = {
  secure: true, //process.env.NODE_ENV === 'production' ? true : false,
  maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
  httpOnly: true,
  // sameSite: 'None', 
  // domain: process.env.COOKIES_DOMAIN
};

const userRegister = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // check if user fields are empty
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    return next(new ApiError(400, "All fields are required"));
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(
      new ApiError(400, "User exists with provided email", userExists)
    );
  }

  // create user object
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: "",
    },
  });
  
  if (!user) {
    return next(ApiError(400, "User registration failed, Please try again"))
  }

  // if user uploads file
  if (req.file) {
    console.log("files", req.file);
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms", // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: "fill",
      });

      // if success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.unlinkSync(`./uploads/${req.file.filename}`);
      }
      
    } catch (err) {
      return next(
        new ApiError(err.message || 500, "File not uploaded, please try again")
      );
    }
  }

  await user.save();

  user.password = undefined;

  const token = await user.generateJWTToken();
  res.cookie("token", token, cookieOptions);

  // const registerUser = await User.findOne({ email });

  res.status(201).json({
    success: true,
    message: "User register successfully!!",
    user,
  });
};

const userLogin = async (req, res, next) => {  

  const {email, password} = req.body;

  if (!email || !password) {
      return next(new ApiError(400, "Email or Password is required"));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ApiError(401, "email does not matched"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(new ApiError(401, "Password does not matched"));
  }

  const token = await user.generateJWTToken();

  user.password = undefined;

  res.cookie('token', token, cookieOptions);
  // console.log("token:", token);

  const loggedInUser = await User.findOne({ email });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    // token: token,
    user: loggedInUser
  })


};

const userLogout = (_req, res, _next) => {
  res.cookie("token", null, {
    secure: true, //process.env.NODE_ENV === 'production',
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user loggout successfully",
  });
};

const getProfile = async (req, res, next) => {
  // console.log("req.user" , req.user);
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

const forgotPassword = async (req, res, next) => {
  // steps that we follow for forgot password 
  // 1. We take email of user from req.body
  // 2. Validate the email that user exists or not
  // 3. Generate new token
  // 4. Send email with new url containing token +
  //    save token expiry in database

  // if user that time duration clicks on the new url which we sent to user's email then...
  // 1. Get token from uri param 
  // 2. Verify token in database
  // 3. upadate password in database 

  // Extracting email from request body
  const { email } = req.body;

  // check if user does not miss this field
  if (!email) {
    return next(new ApiError(400, "Email is required!!"));
  }

  // validate user's email in database
  const user = await User.findOne({ email });

  // check if user does not exists with the provided email
  if (!user) {
    return next(
      new ApiError(400, "Email not registered")
    );
  }

  // Generate random url
  const resetToken = await user.genratePasswordResetToken();

  // store resetToken in database
  await user.save();

  // constructing a url to send the correct data
  /**HERE
   * req.protocol will send if http or https
   * req.get('host') will get the hostname
   * the rest is the route that we will create to verify if token is correct or not
   */
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/user/reset/${resetToken}`;

  // genrate url and sent token to user
  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
  console.log("resetPasswordURL", resetPasswordURL);

  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

  console.log("Sending email to:", email);

  try {
    await sendEmail({
      to: email,
      subject,
      html: message
    });

    // If email sent successfully send the success response
    res.status(200).json({
      success: true,
      message: `Resert Password token has been sent to ${email} successfully`,
    });
  } catch (err) {
    // If some error happened we need to clear the forgotPassword* fields in our DB
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    return next(new ApiError(400, err.message));
  }
};


/**
 * @RESET_PASSWORD
 * @ROUTE @POST {{URL}}/api/v1/user/reset/:resetToken
 * @ACCESS Public
 */
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  if (!password) {
    return next(new ApiError(400, "New Password for Change is required"));
  }

  // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm
  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log("forgotPasswordToken", forgotPasswordToken);

    // reset token that we save in database when we create that token, check if exists or not
  const user = await User.findOne({
    forgotPasswordToken: forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },  // $gt will help us check for greater than value, with this we can check if token is valid or expired
  });

  console.log("user:-", user);

  // If not found or expired send the response
  if (!user) {
    return next(
      new ApiError(400, "Token is invalid or expired, Please try again")
    );
  }

   // Update the password if token is valid and not expired
  user.password = password;

  // making forgotPassword* valus undefined in the DB
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password change successfully!!",
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new ApiError(400, "password and newPassword is required"));
  }

  const user = await User.findById(id).select("+password");
  console.log("user:-", user);

  if (!user) {
    return next(new ApiError(400, "User does not exist!"));
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    return next(new ApiError(400, "Invalid old Password!"));
  }

  user.password = newPassword;
  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "your old password is changed now!!",
  });
};

const updateProfile = async (req, res, next) => {

  const { fullName } = req.body;

  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ApiError(400, "User does not exist!"));
  }

  //req.user means given by user in body and upadte this user's fullName in user object
  if (fullName) {
    user.fullName = fullName;
  }

  // if user want update therir avatar
  if (req.file) {
    await cloudinary.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms", //Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", //This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: "fill",
      });

      //if success
      if (result) {
        //Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //After successful upload remove the file from local storage
        fs.unlinkSync(`./uploads/${req.file.filename}`);
      }
    } catch (err) {
      return next(
        new ApiError(err || 400, "File not uploaded, please try again")
      );
    }
  }

  await user.save();

  // const updatedUser = await User.findById(id)

  const token = await user.generateJWTToken();
  res.cookie("token", token, cookieOptions);
  

  res.status(201).json({
    success: true,
    message: "User details updated successfully!!",
    user,
  });
};

const adminData = async (req, res, next) => {

  const users = await User.find({})

  res.status(201).json({
    success: true,
    message: "All Users",
    users,
  });


}

const updateUserRole = async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError(400, "User does not exist!"));
  }

  if (user.role === "USER") user.role = "ADMIN"
  else user.role = "USER"

  await user.save();


  res.status(201).json({
    success: true,
    message: "Role updated",
  });

}

const deleteUser = async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError(400, "User does not exist!"));
  }

  await cloudinary.uploader.destroy(user.avatar.public_id);


  await user.deleteUser();

  // cancel subscription

  res.status(201).json({
    success: true,
    message: "User Deleted",
  });

}


export {
  userRegister,
  userLogin,
  userLogout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  adminData,
  updateUserRole,
  deleteUser
};
