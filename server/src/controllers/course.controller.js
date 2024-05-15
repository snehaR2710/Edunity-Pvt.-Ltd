import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/course.model.js";
import { ApiError } from "../utils/error.js";

const getAllCourses = async function (_req, res, _next) {
  const courses = await Course.find({}).select("-lectures");

  res.status(200).json({
    success: true,
    message: "All Courses",
    courses,
  });
};

const createCourse = async function (req, res, next) {
  const { title, description, category, createdBy } = req.body;

  if (
    [title, description, category, createdBy].some(
      (field) => field?.trim() === ""
    )
  ) {
    return next(new ApiError(400, "All fields are required"));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "Dummy",
      secure_url: "Dummy",
    },
  });

  if (!course) {
    return next(
      new ApiError(400, "Course could not be created, Please try again")
    );
  }

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
        width: 300,
        height: 300,
        gravity: "faces",
        crop: "fill",
      });

      // console.log("result", result);
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.unlinkSync(`./uploads/${req.file.filename}`);
    }
  } catch (error) {
    return next(new ApiError(500, error.message));
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

const updateCourse = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new ApiError(500, "Course with given id does not exists"));
    }

    const couserUpdatedDetails = await Course.findById(id);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      couserUpdatedDetails,
    });
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
};

const removeCourse = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new ApiError(500, "Course with given id does not exists"));
    }

    await course.deleteOne();

    // await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course delated successfully",
    });
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
};

const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new ApiError(400, "Invalid course id or course not found."));
    }

    const getLecture = await Course.findById(id);

    res.status(200).json({
      success: true,
      message: "Course lecture fetched successfully",
      lectures: getLecture.lectures,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};


/**
 * @ADD_LECTURE
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin Only)
 */

const addLectureToCourseById = async (req, res, next) => {

    try {
      const { title, description } = req.body;
      const { id } = req.params;
  
      const lectureData = {
        title,
        description,
        lecture: {}
      }
  
      if (!title || !description) {
        return next(new ApiError(400, "All fields are required"));
      }   
      
      const course = await Course.findById(id);
  
      if (!course) {
        return next(new ApiError(400, "Course does not exists by given id"));
      }
  
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "lms",
            chunk_size: 50000000, // 50 mb size
            resource_type: 'video',
            
          });
    
          // console.log("result", result);
          if (result) {
            lectureData.lecture.public_id = result.public_id;
            lectureData.lecture.secure_url = result.secure_url;
          }
    
          fs.unlinkSync(`./uploads/${req.file.filename}`);

        } catch (error) {
           // Empty the uploads directory without deleting the uploads directory
           for (const file of await fs.readdir('uploads/')) {
              await fs.unlinkSync(path.join('uploads/', file))
           }
          return next(new ApiError(400, JSON.stringify(error) || 'File not uploaded, please try again'));
        }
      }
  
      course.lectures.push(lectureData);
  
      course.numberOfLectures = course.lectures.length;
  
      await course.save();
  
      res.status(200).json({
        success: true,
        message: "Lecture successfully added to the course",
        course,
      });
    } catch (error) {
      return next(new ApiError(400, error.message));

    }

  
};

export {
  getAllCourses,
  createCourse,
  updateCourse,
  removeCourse,
  getLecturesByCourseId,
  addLectureToCourseById,
};
