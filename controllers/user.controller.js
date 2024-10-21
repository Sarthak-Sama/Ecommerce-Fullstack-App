const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListModel = require("../models/blacklist.model");



module.exports.signup = async (req, res, next) => {
    try {
        const { email, password, username, role } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.create({
            email, 
            password: hashedPassword,
            username,
            role
        });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: `${7*24}h` });

        res.status(201).json({
            message: "User created successfully.",
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: `${7*24}h` });

        res.status(200).json({
            message: "User signed in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports.signout = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                message: "No token provided"
            });
        }

        // Add token to blacklist
        await blackListModel.create({token});

        res.status(200).json({
            message: "User signed out successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports.profile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        res.status(200).json({
            message: "User fetched sucessfully",
            user
        })
    } catch (error) {
        next(error)
    }
}




