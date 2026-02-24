//all imports
import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";



dotenv.config();

//create app
const app=express();


app.use("/api/auth",authRoutes)

app.use(express.json())


const PORT=process.env.PORT;


//run the app
app.listen(PORT,()=>
{
    console.log("server is running",PORT);
    connectDB()
})  