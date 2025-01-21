const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.isAuthenticated, cartController.getUserCart);
router.post(
  "/add",
  authMiddleware.isAuthenticated,
  cartController.addItemToCart
);
router.put(
  "/update",
  authMiddleware.isAuthenticated,
  cartController.updateCart
);
router.delete(
  "/remove",
  authMiddleware.isAuthenticated,
  cartController.removeItemFromCart
);

module.exports = router;
