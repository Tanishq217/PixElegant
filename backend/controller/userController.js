import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cartData: {}, // align with cartData field in other controllers
    });

    // Return user info (without password)
    const { password: pwd, ...userData } = newUser._doc; // exclude password
    return res.status(201).json(userData);
  } catch (error) {
    console.log("registerUser error:", error);
    return res.status(500).json({ message: `registerUser error: ${error}` });
  }
};

// Get current logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser error:", error);
    return res.status(500).json({ message: `getCurrentUser error ${error}` });
  }
};

// Get admin info (optional)
export const getAdmin = async (req, res) => {
  try {
    const adminEmail = req.adminEmail;
    if (!adminEmail) return res.status(404).json({ message: "Admin not found" });
    return res.status(200).json({ email: adminEmail, role: "admin" });
  } catch (error) {
    console.log("getAdmin error:", error);
    return res.status(500).json({ message: `getAdmin error ${error}` });
  }
};
