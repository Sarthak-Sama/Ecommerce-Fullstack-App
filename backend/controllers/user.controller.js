const userModel = require("../models/user.model");
const shopModel = require("../models/shop.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListModel = require("../models/blacklist.model");
const { isAdmin } = require("../middlewares/auth.middleware");
const orderModel = require("../models/order.model");
const paymentModel = require("../models/payment.model");
const otpGenerator = require("otp-generator"); // Import OTP generator
const otpModel = require("../models/otp.model"); // Import OTP model (to store OTPs)
const nodemailer = require("nodemailer"); // Import nodemailer

module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, username, mobile } = req.body;

    const requiredFields = ["email", "password", "username", "mobile"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Check if user already exists with the provided mobile number
    const isMobileAlreadyExists = await userModel.findOne({ mobile });
    if (isMobileAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this mobile number",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      username,
      mobile,
    });

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    await otpModel.create({ mobile, otp }); // Store OTP in the database

    // Send OTP via SMS (implement your SMS sending logic here)
    await sendSms(mobile, otp);

    res.status(200).json({
      message: "OTP sent to mobile number. Please verify.",
    });
  } catch (error) {
    next(error);
  }
};
// Function to verify OTP
module.exports.verifyOtp = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;

    const otpRecord = await otpModel.findOne({ mobile, otp });
    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // Find the user associated with the mobile number
    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save(); // Save the updated user document

    // OTP is valid, proceed to create token and cookies
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "OTP verified successfully. User is now verified.",
      token,
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email, // Send to user's email
      subject: "Account Creation Successful",
      text: "Congratulations! Your account has been successfully created and verified.",
    };

    await transporter.sendMail(mailOptions); // Send the email

    // Optionally, delete the OTP record after verification
    await otpModel.deleteOne({ mobile, otp });
  } catch (error) {
    next(error);
  }
};

// User sign-in function
module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Destructure email and password from request body

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: `${7 * 24}h`,
    });

    // Respond with success message and user details
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};

// User sign-out function
module.exports.signout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from authorization header

    // Check if token is provided
    if (!token) {
      return res.status(400).json({
        message: "No token provided",
      });
    }

    // Add token to blacklist to invalidate it
    await blackListModel.create({ token });

    // Respond with success message
    res.status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};

// Function to create a shop for the user
module.exports.createShop = async (req, res, next) => {
  try {
    const { name } = req.body; // Destructure name and description from request body

    // Check if name and description are provided
    if (!name) {
      return res.status(400).json({
        message: "Provide a name for the shop.",
      });
    }

    // Create a new shop associated with the user
    const shop = await shopModel.create({
      owner: req.user._id, // Associate shop with the user
      name,
    });
    //Update the User role
    const user = await userModel.updateOne(
      { _id: req.user._id }, // Find the user by their ID
      { $set: { role: "seller" } } // Set the role to 'seller'
    );

    res.status(201).json({
      message: "Shop created successfully",
      shop,
      user,
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};

// User profile retrieval function
module.exports.profile = async (req, res, next) => {
  try {
    // Find user by ID from the request
    const user = await userModel.findById(req.user._id);

    // Retrieve orders associated with the user
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products.product") // Populate product details
      .populate("payment") // Populate payment details
      .populate("shop"); // Populate shop details

    // Respond with user and orders information
    res.status(200).json({
      message: "User fetched successfully",
      user,
      orders,
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};

// User transaction history retrieval function
module.exports.transactionHistory = async (req, res, next) => {
  try {
    // Find transactions associated with the user
    const transactions = await paymentModel
      .find({ buyer: req.user._id })
      .populate("shop"); // Populate shop details

    // Respond with transaction details
    res.status(200).json({
      transactions,
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};
