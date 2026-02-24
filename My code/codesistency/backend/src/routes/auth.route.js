//import 
import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

// create router
const router=express.Router();
 

// router list
router.post("/signup",signup);
router.post("/login",login);            
router.post("/logout",logout);


// export
export default router;