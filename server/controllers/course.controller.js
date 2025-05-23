import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js"
import {deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia} from "../utils/cloudinary.js"

export const createCourse=async(req,res)=>{
    try {
        const {courseTitle,category}=req.body
        if(!courseTitle || !category){
            return res.status(400).json({
                message:"Course title and category are required"
            })
        }

        const course=await Course.create({
            courseTitle,
            category,
            creator:req.id
        })

        return res.status(201).json({
            course,
            message:"Course Created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}


export const getCreatorCourses=async(req,res)=>{
    try {
        const userId=req.id

        const courses=await Course.find({creator:userId})

        if(!courses){
            return res.status(404).json({
                course:[],
                message:"Course not found"
            })
        }

        return res.status(200).json({
            courses,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch all course"
        })
    }
}


export const editCourse=async(req,res)=>{
    try {
        const courseId=req.params.courseId
        const {courseTitle,subTitle,description,category,courseLevel,coursePrice}=req.
        body
        const thumbnail=req.file

        let course=await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        let courseThumbnail

        if(thumbnail){
            if(course.courseThumbnail){
                const publicId=course.courseThumbnail.split("/").pop().split(".")[0]
                await deleteMediaFromCloudinary(publicId) // delete old image
            }

            courseThumbnail=await uploadMedia(thumbnail.path);
        }

        const updateData={courseTitle,subTitle,description,category,courseLevel,coursePrice,courseThumbnail:courseThumbnail?.secure_url}

        course=await Course.findByIdAndUpdate(courseId,updateData,{new:true})

        return res.status(200).json({
            course,
            message:"Course updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to update  course"
        })
    }
}


export const getCourseById=async(req,res)=>{
    try {
        const courseId=req.params.courseId

        const course=await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        return res.status(200).json({
            course
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Failed to fetch  course by id"
        })
    }
}


export const createLecture=async(req,res)=>{
    try {
        const {lectureTitle}=req.body
        const {courseId}=req.params

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message:"Lecture title and course if is required"
            })
        }

        const lecture=await Lecture.create({lectureTitle});

        const course=await Course.findById(courseId)

        if(course){
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(201).json({
            lecture,
            message:"Lecture created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create lecture"
        })
    }
}


export const getCourseLecture=async(req,res)=>{
    try {
        const {courseId}=req.params

        const course=await Course.findById(courseId).populate("lectures")

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        return res.status(200).json({
            lectures:course.lectures,
            message:"Lecture fetched successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to get lecture"
        })
    }
}


export const editLecture=async(req,res)=>{
    try {
        const {lectureTitle,videoInfo,isPreviewFree}=req.body

        const {courseId,lectureId}=req.params

        const lecture=await Lecture.findById(lectureId)

        if(!lecture){
            return res.status(404).json({
                message:"lecture not found"
            })
        }

        if(lectureTitle){
            lecture.lectureTitle=lectureTitle
        }
        if(videoInfo.videoUrl){
            lecture.videoUrl=videoInfo.videoUrl
        }
        if(videoInfo.publicId){
            lecture.publicId=videoInfo.publicId
        }
        if(isPreviewFree){
            lecture.isPreviewFree=isPreviewFree
        }

        await lecture.save()

        const course=await Course.findById(courseId)

        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(200).json({
            lecture,
            message:"Lecture updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to edit lecture"
        })
        
    }
}




export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            });
        }
        // delete the lecture from couldinary as well
        if(lecture.publicId){
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated course
        await Course.updateOne(
            {lectures:lectureId}, // find the course that contains the lecture
            {$pull:{lectures:lectureId}} // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message:"Lecture removed successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to remove lecture"
        })
    }
}


export const getLectureById=async(req,res)=>{
    try {
        const {lectureId}=req.params

        const lecture=await Lecture.findById(lectureId)

        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found"
            })
        }

        return res.status(200).json({
            lecture        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to get lecture by id"
        })
        
    }
}



// publish unpusblish code logic
export const togglePublishCourse=async(req,res)=>{
    try {
        const {courseId}=req.params
        const {publish}=req.query // bool value

        const course=await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            });
        }

        // publish based on query
        course.isPublished=publish==="true";

        await course.save()

        const statusMes=course.isPublished?"Publish":"Unpublish"
        return res.status(200).json({
            message:`Course is ${statusMes}`
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to update stattus"
        })
    }
}


export const getPublishCourse=async(req,res)=>{
    try {
        const courses=await Course.find({isPublished:true}).populate({path:"creator",select:"name photoURL"})

        if(!courses){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        return res.status(200).json({
            courses
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to get publish courses"
        })
    }
}


export const searchCourse = async (req, res) => {
    try {
      const { query = "", categories = "", sortByPrice = "" } = req.query;
  
      // create search query
      const searchCriteria = {
        isPublished: true,
        $or: [
          { courseTitle: { $regex: query, $options: "i" } },
          { subTitle: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      };
  
      // if categories are selected
      let categoryArray = [];
      if (typeof categories === "string" && categories.trim() !== "") {
        categoryArray = categories.split(",").map((cat) => cat.trim());
      }
  
      if (Array.isArray(categories)) {
        categoryArray = categories;  // (in case array is directly passed)
      }
  
      if (categoryArray.length > 0) {
        searchCriteria.category = { $in: categoryArray };
      }
  
      // define sorting order
      const sortOptions = {};
  
      if (sortByPrice === "low") {
        sortOptions.coursePrice = 1; // ascending
      } else if (sortByPrice === "high") {
        sortOptions.coursePrice = -1;
      }
  
      const courses = await Course.find(searchCriteria)
        .populate({ path: "creator", select: "name photoURL" })
        .sort(sortOptions);
  
      return res.status(200).json({
        success: true,
        courses: courses || [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  // course.controller.js
export const deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Delete course thumbnail if exists
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
  
      // Delete all associated lectures (if you're handling lectures as separate docs)
      await Lecture.deleteMany({ course: courseId });
  
      // Finally delete course
      await Course.findByIdAndDelete(courseId);
  
      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete course" });
    }
  };
  