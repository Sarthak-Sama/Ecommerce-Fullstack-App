const wishlistModel = require("../models/wishlist.model");

module.exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await wishlistModel
      .findOne({ userId })
      .populate("products");

    if (!wishlist) {
      wishlistModel.create({ userId });
    }

    res.status(200).json({
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Add product to wishlist
module.exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    // Find or create wishlist
    let wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      wishlist = await wishlistModel.create({
        userId,
        products: [productId],
      });
    } else {
      // Check if product already exists
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    // Populate product details
    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product from wishlist
module.exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
