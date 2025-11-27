const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = "myVerySecretKey123";

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization) {
            token = req.headers.authorization;
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { protect };
