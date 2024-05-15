import { Router } from "express";
import { contactUs, userStats } from "../controllers/miscellaneous.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/user.middleware.js";

const router = Router();

router.route("/contact").post(contactUs);

router
  .route("/admin/stats/users")
  .post(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default router;
