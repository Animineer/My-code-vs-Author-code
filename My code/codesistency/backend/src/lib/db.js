import mongoose from "mongoose";


export const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MANGODB_URI)
        console.log("mangodb connected", conn.connection.host)
    } catch (error) {
        
        console.log("mangodb connection error", error);
    }
     
}