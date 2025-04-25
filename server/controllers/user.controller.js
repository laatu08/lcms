import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please fill in all fields"})
        }

        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({name,email,password:hashedPassword})

        return res.status(201).json({success:true,message:"Account created successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Failed to create account"})
    }
}


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:"Please fill in all fields"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist with this email"
            })
        }

        const isPassword=await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        generateToken(res,user,`Welcome back ${user.name}`)

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Failed to login account"})
    }
}

export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Failed to logout"})
    }
}

export const getUserProfile=async(req,res)=>{
    try {
        const userId=req.id
        const user=await User.findById(userId).select("-password").populate("enrolledCourses")

        if(!user){
            return res.status(404).json({success:false,message:"User Profile not found"})
        }

        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Failed to load user"})
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const userId=req.id

        const {name}=req.body
        const profilePhoto=req.file
        console.log(profilePhoto);

        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }

        // extract public id of old image from the url if it exist
        if(user.photoURL){
            const publicId=user.photoURL.split("/").pop().split(".")[0]
            deleteMediaFromCloudinary(publicId)
        }

        // upload new photo
        const cloudResponse=await uploadMedia(profilePhoto.path)
        const {secure_url:photoURL}=cloudResponse

        const updatedData={name,photoURL}
        const updatedUser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password")

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"User profile updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Failed to update user profile"})
    }
}