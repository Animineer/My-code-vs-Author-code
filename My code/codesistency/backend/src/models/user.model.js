//import
import mongoose from "mongoose";


//create schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },},
       {timestamps:true}
)

//assigning to model
const User= mongoose.model("User", userSchema)


//export
export default User;