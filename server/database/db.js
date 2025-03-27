import mongoose from "mongoose"

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB=async()=>{
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI,clientOptions)

        await mongoose.connection.db.admin().command({ ping: 1 });

        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("error occured ",error);
    }
}

export default connectDB