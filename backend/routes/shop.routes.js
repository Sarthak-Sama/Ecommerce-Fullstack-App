const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:shopName", shopController.fetchShopDets);
router.post(
  "/create-shop",
  authMiddleware.isAuthenticated,
  authMiddleware.isSeller,
  shopController.createShop
);

module.exports = router;
