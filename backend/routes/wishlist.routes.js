const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

// Get user wishlist
router.get(
  "/",
  authMiddleware.isAuthenticated,
  wishlistController.getUserWishlist
);

// Add product to wishlist
router.post(
  "/add",
  authMiddleware.isAuthenticated,
  wishlistController.addToWishlist
);

// Remove product from wishlist
router.delete(
  "/remove",
  authMiddleware.isAuthenticated,
  wishlistController.removeFromWishlist
);

module.exports = router;
