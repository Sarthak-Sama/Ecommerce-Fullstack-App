const userModel = require("../models/user.model");
const shopModel = require("../models/shop.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListModel = require("../models/blacklist.model");
const { isAdmin } = require("../middlewares/auth.middleware");
const orderModel = require("../models/order.model");
const paymentModel = require("../models/payment.model");



module.exports.signup = async (req, res, next) => {
    try {
        const { email, password, username, role, shop } = req.body;

        const requiredFields = req.body.role != "seller" ? ['email', 'password', 'username'] : ['email', 'password', 'username', 'shop'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`
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
            role,
            shop
        });
        
        let createdShop;
        if(role == "seller"){
            createdShop = await shopModel.create({
            name: shop,
            owner: user._id
            })
        }

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: `${7*24}h` });

        res.status(201).json({
            message: "User created successfully.",
            user,
            ...(role === "seller" && { createdShop }),
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
        const orders = await orderModel.find({buyer: req.user._id})
        .populate('products.product') // Populate product details
        .populate('payment') // Populate payment details
        .populate('shop'); // Populate shop details

        res.status(200).json({
            message: "User fetched successfully",
            user,
            orders
        });
    } catch (error) {
        next(error);
    }
}

module.exports.transactionHistory = async (req, res, next) => {
    try {
        const transactions = await paymentModel.find({buyer: req.user._id})
        .populate('shop');



        res.status(200).json({
            transactions
        })
    } catch (error) {
        next(error);
    }
}



