import express from 'express'
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCourse, getCreatorCourses } from '../controllers/course.controller.js'

const router=express.Router()

// router.route("/register").post(register)
router.post("/",isAuthenticated,createCourse)
router.get("/",isAuthenticated,getCreatorCourses)


export default router