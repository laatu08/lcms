import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./database/db.js"

import userRoutes from "./routes/user.route.js"
import courseRoutes from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config({})

// db
connectDB()

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const PORT=process.env.PORT || 3000

app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress",courseProgressRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})