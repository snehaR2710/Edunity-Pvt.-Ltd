import {Router} from "express";
import { isLoggedIn } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { changePassword, forgotPassword, getProfile, resetPassword, updateProfile, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post( upload.single("avatar") ,userRegister );
router.route('/login').post( userLogin );
router.route('/logout').post( userLogout );
router.route('/getuser').get( isLoggedIn,getProfile );
router.route('/reset').post(forgotPassword);
router.route('/reset/:resetToken').post(resetPassword);
router.route('/change-password').post(isLoggedIn, changePassword);
router.route('/update/:id').put(isLoggedIn, upload.single("avatar"), updateProfile)



export default router;