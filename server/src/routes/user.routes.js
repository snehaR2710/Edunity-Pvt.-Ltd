import {Router} from "express";
import { authorizedRoles, isLoggedIn } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { adminData, changePassword, deleteUser, forgotPassword, getProfile, resetPassword, updateProfile, updateUserRole, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post( upload.single("avatar") ,userRegister );
router.route('/login').post( userLogin );
router.route('/logout').post( userLogout );
router.route('/getuser').get(isLoggedIn, getProfile );
router.route('/forgotpassword').post(forgotPassword);
router.route('/reset/:resetToken').post(resetPassword);
router.route('/change-password').post(isLoggedIn, changePassword);
router.route('/update/:id').put(isLoggedIn, upload.single("avatar"), updateProfile)

router.route('/admin').get(isLoggedIn, authorizedRoles('ADMIN'), adminData );
router
    .route('/admin/:id')
    .put(isLoggedIn, authorizedRoles('ADMIN'), updateUserRole)
    .delete(isLoggedIn, authorizedRoles('ADMIN'), deleteUser)


export default router;