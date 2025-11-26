const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "myVerySecretKey123";


const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      
      // verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // find user by userId (because token contains userId)
      req.user = await User.findOne({ userId: decoded.userId }).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();

    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "No token provided" });
};

module.exports = { protect };
