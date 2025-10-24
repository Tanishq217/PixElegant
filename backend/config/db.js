import mongoose from "mongoose";
const connectDb = async () => {
    try {
        // Using your MongoDB Atlas database
        const mongoUri = process.env.MONGODB_URL;
        await mongoose.connect(mongoUri)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("DB error:", error.message)
        throw error;
    }
    
}
export default connectDb