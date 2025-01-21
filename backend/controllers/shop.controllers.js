const shopModel = require("../models/shop.model");
const userModel = require("../models/user.model");

// Function to create a shop for the user
module.exports.createShop = async (req, res, next) => {
  try {
    const { name, description } = req.body; // Destructure name and description from request body

    // Check if name and description are provided
    if (!name) {
      return res.status(400).json({
        message: "Provide a name for the shop.",
      });
    }
    if (!description) {
      return res.status(400).json({
        message: "Provide a description for the shop.",
      });
    }

    // Create a new shop associated with the user
    const shop = await shopModel.create({
      owner: req.user._id, // Associate shop with the user
      name,
      description,
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

module.exports.fetchShopDets = async (req, res, next) => {
  try {
    const { shopName } = req.params; // Get shop name from the URL parameters

    // Find the shop by name and populate 'products' and 'owner'
    const shop = await shopModel
      .findOne({ name: shopName })
      .populate("products")
      .populate("owner");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Send back the shop data
    res.status(200).json(shop);
  } catch (error) {
    next(error);
  }
};
