import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

// Determine if running in production (Render sets NODE_ENV to 'production')
const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // Set to true in production (HTTPS)
  sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-site, 'Lax' for local
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// User Registration
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const token = await genToken(user._id);

    // Use defined cookie options
    res.cookie("token", token, cookieOptions);

    // Exclude password from the response
    const { password: pwd, ...userData } = user._doc;
    return res.status(201).json(userData);

  } catch (error) {
    console.log("registration error", error);
    return res.status(500).json({ message: `Registration error: ${error.message}` }); // Include error message
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) { // Check if user exists and has a password (for non-Google users)
      return res.status(404).json({ message: "User not found or password not set" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);

    // Use defined cookie options
    res.cookie("token", token, cookieOptions);

    // Exclude password from the response
    const { password: pwd, ...userData } = user._doc;
    return res.status(200).json(userData); // Changed status to 200 for successful login

  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: `Login error: ${error.message}` }); // Include error message
  }
};

// Logout
export const logOut = async (req, res) => {
  try {
    // Clear the cookie using options consistent with setting it
    const clearCookieOptions = {
        ...cookieOptions,
        maxAge: 0 // Expire the cookie immediately
    };
    res.clearCookie("token", clearCookieOptions);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("logout error", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` }); // Include error message
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      // Create user without password for Google login
      user = await User.create({ name, email, cartData: {} });
    }

    const token = await genToken(user._id);

    // Use defined cookie options
    res.cookie("token", token, cookieOptions);

    // Exclude password if it exists (it shouldn't for new Google users)
    const { password: pwd, ...userData } = user._doc;
    return res.status(200).json(userData);

  } catch (error) {
    console.log("googleLogin error", error);
    return res.status(500).json({ message: `GoogleLogin error: ${error.message}` }); // Include error message
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await genToken1(email); // Using genToken1 for admin

      // Use defined cookie options (adjust maxAge if needed for admin)
      const adminCookieOptions = { ...cookieOptions, maxAge: 1 * 24 * 60 * 60 * 1000 }; // 1 day for admin?
      res.cookie("token", token, adminCookieOptions);

      return res.status(200).json({ message: "Admin login successful" }); // Return message or admin info if needed
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("adminLogin error", error);
    return res.status(500).json({ message: `AdminLogin error: ${error.message}` }); // Include error message
  }
};