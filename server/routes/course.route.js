import express from 'express'
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses } from '../controllers/course.controller.js'
import upload from "../utils/multer.js"

const router=express.Router()

// router.route("/register").post(register)
router.post("/",isAuthenticated,createCourse)
router.get("/",isAuthenticated,getCreatorCourses)
router.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.get("/:courseId",isAuthenticated,getCourseById)
router.post("/:courseId/lecture",isAuthenticated,createLecture)
router.get("/:courseId/lecture",isAuthenticated,getCourseLecture)
router.post("/:courseId/lecture/:lectureId",isAuthenticated,editLecture)
router.post("/lecture/:lectureId",isAuthenticated,editLecture)


export default router