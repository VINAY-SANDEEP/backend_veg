const admin = require('../Model/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../Model/productModel');
const cloudinary = require('../config/cloudinary');
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await admin.findOne({ name });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new admin({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        const token = jwt.sign(
            { name, email },
            process.env.JWT_SECRET,   
            { expiresIn: "1d" }
        );
        res.status(201).json({
            message: "User successfully registered",
            token
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User is not registered" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {Register,login};
