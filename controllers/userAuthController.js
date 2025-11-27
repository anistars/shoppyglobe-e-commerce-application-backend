const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "myVerySecretKey123";

// Register
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/;
        console.log("Registering user with password:", password);
        // 1. Check missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        // 3. Validate password length
        if (!passwordRegex.test(password)) {
            console.log("Password does not meet requirements");
            return res.status(400).json({
                message:
                    "Password must start with an uppercase letter, contain at least one special character (!@#$%^&*), and be at least 8 characters long"
            });
        }

        // 4. Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 5. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();

        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // 3. Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4. Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 5. Create token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
