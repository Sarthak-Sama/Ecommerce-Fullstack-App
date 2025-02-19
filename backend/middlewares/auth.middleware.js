const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");
const shopModel = require("../models/shop.model");

module.exports.optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

    // No token - continue as guest
    if (!token) {
      return next();
    }

    // Check blacklist
    const isBlackListed = await blackListModel.findOne({ token });
    if (isBlackListed) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return next();
    }

    // Set the user on the request object
    req.user = user;
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return next(error);
  }
};

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.cookies.token;

    const isBlackListed = await blackListModel.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Set the user on the request object
    req.user = user;

    // Call next() to pass control to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.isSeller = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "seller") {
      next();
    } else {
      res.status(403).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.isBlackListedShop = async (req, res, next) => {
  try {
    shop = shopModel.findone({ owner: req.user._id });
    if (shop.isBlackListed === false) {
      next();
    } else {
      res.status(403).json({
        message: "Unathorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
