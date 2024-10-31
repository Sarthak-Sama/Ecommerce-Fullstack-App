const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.isAuthenticated, cartController.getUserCart);
router.post("/", authMiddleware.isAuthenticated, cartController.addItemToCart);
router.put("/", authMiddleware.isAuthenticated, cartController.updateCart);
router.delete("/remove/:productId", authMiddleware.isAuthenticated, cartController.removeItemFromCart);


module.exports = router;