import crypto from "crypto";
import mongoose, { Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ], // Matches email against regex
    },
    password: {
      type: String,
      required: [true, "Password is required!!"],
      trim: true,
      select: false,
    },
    subscription: {
      id: String,
      status: String,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

// password incrypt
userSchema.pre("save", async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified("password")) return next();

  // otherwise incrypt password
  this.password = await bcrypt.hash(this.password, 8)
  next();
});


// method which will help us compare plain password with hashed password and returns true or false
userSchema.methods.isPasswordCorrect = async function(password) {
  // console.log("password-> ",password, "",this.password);

  if (!password || !this.password) {
      throw new ApiError(401,'Password or hashed password is missing.');
  }
  return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateJWTToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      subscription: this.subscription,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

userSchema.methods.genratePasswordResetToken = async function () {
  // creating a random token using node's built-in crypto module
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
  this.forgotPasswordToken = crypto
    .createHash("sha256") //hash token 
    .update(resetToken)  // update reset token
    .digest("hex");      // convert into string


  // Adding forgot password expiry to 15 minutes
  this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000; //10min from now

  return resetToken;
};


const User = mongoose.model("User", userSchema);
export default User;

