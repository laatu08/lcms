import express from 'express'
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, deleteCourse, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishCourse, removeLecture, searchCourse, togglePublishCourse } from '../controllers/course.controller.js'
import upload from "../utils/multer.js"

const router=express.Router()

// router.route("/register").post(register)
router.post("/",isAuthenticated,createCourse)
router.get("/search",isAuthenticated,searchCourse)
router.get("/",isAuthenticated,getCreatorCourses)
router.get("/published-courses",getPublishCourse)
router.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.get("/:courseId",isAuthenticated,getCourseById)
router.post("/:courseId/lecture",isAuthenticated,createLecture)
router.get("/:courseId/lecture",isAuthenticated,getCourseLecture)
router.post("/:courseId/lecture/:lectureId",isAuthenticated,editLecture)
router.delete("/lecture/:lectureId",isAuthenticated,removeLecture)
router.get("/lecture/:lectureId",isAuthenticated,getLectureById)

router.patch("/:courseId",isAuthenticated,togglePublishCourse)
router.delete("/delete/:courseId", isAuthenticated, deleteCourse);




export default router