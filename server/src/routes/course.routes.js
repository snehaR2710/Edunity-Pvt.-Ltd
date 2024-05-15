import {Router} from "express";
import { authorizedRoles, isLoggedIn } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";


const router = Router();

router.route("/")
.get( getAllCourses )
.post(isLoggedIn, authorizedRoles('ADMIN'), upload.single("thumbnail"), createCourse)


router.route("/:id")
.get(isLoggedIn, getLecturesByCourseId)
.put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
.delete(isLoggedIn, authorizedRoles('ADMIN'), removeCourse)
.post(isLoggedIn, authorizedRoles('ADMIN'),upload.single("lecture"), addLectureToCourseById)




export default router

