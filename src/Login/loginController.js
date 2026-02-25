const jwt = require("jsonwebtoken");
const Login = require("./../mongoDb/models/Login");
const asyncHandler = require("../utils/asyncHandler");

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// REGISTER
exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await Login.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Login already exists");
    }

    const user = await Login.create({
        name,
        email: email.toLowerCase(),
        password,
        role,
    });

    res.status(201).json({
        success: true,
        token: generateToken(user._id, user.role),
        user,
    });
});

// LOGIN
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Login.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    res.status(200).json({
        success: true,
        token: generateToken(user._id, user.role),
        user,
    });
});

// GET PROFILE
exports.getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});