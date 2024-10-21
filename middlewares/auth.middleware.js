const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model")

module.exports.isAuthenticated = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isBlackListed = await blackListModel.findOne({token});
        if(isBlackListed){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        
        if(!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Set the user on the request object
        req.user = user;

        // Call next() to pass control to the next middleware
        next();
    } catch (error) {
        next(error);
    }
}

module.exports.isSeller = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'seller') {
            next();
        } else {
            res.status(403).json({
                message: "Unauthorized"
            });
        }
    } catch (error) {
        next(error);
    }
};