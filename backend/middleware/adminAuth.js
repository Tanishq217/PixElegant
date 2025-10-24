import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "Not Authorized. Login Again." });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(400).json({ message: "Not Authorized. Invalid token." });
    }

    // Check if the token contains admin email
    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "Not Authorized. Admin access required." });
    }

    req.adminEmail = verifyToken.email;
    next();
  } catch (error) {
    console.log("adminAuth error:", error);
    return res.status(500).json({ message: `adminAuth error: ${error}` });
  }
};

export default adminAuth;
