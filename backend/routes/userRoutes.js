import express from "express";
import { getAdmin, getCurrentUser, registerUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser); // <-- this fixes the 404
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;
