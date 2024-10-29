const shopModel = require("../models/shop.model");


module.exports.getAllBlacklistedShops = async (res, req, next) => {
    try {
        const blacklistedShops = shopModel.find({blacklisted: true})

        res.json({
            blacklistedShops
        })
    } catch (error) {
        next(error)
    }
};
