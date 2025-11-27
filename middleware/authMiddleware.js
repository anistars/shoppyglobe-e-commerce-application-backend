const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "myVerySecretKey123";

const protect = async (req, res, next) => {
  let token;

  // Accept either:
  // 1) Authorization: Bearer token
  // 2) Authorization: token
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user by Mongo _id
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
