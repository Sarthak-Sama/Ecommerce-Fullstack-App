const express = require("express");
const productModel = require("../models/product.model");
const upload = require("../config/multer.config");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");
const { auth } = require("firebase-admin");

const router = express.Router();
// ---------- GET ROUTES --------------//

router.get(
  "/search",
  authMiddleware.optionalAuth,
  productController.searchProducts
);
router.get(
  "/all",
  authMiddleware.optionalAuth,
  productController.getAllProducts
);
router.get(
  "/womens-wear",
  authMiddleware.optionalAuth,
  productController.getWomensWear
);
router.get(
  "/mens-wear",
  authMiddleware.optionalAuth,
  productController.getMensWear
);
router.get("/kids", authMiddleware.optionalAuth, productController.getKidsWear);
router.get(
  "/sale",
  authMiddleware.optionalAuth,
  productController.getSaleItems
);
router.get(
  "/:id",
  authMiddleware.optionalAuth,
  productController.getProductById
);

// -------- POST ROUTES ------- //
router.post(
  "/create-product",
  authMiddleware.isAuthenticated,
  authMiddleware.isSeller,
  upload.any("image"),
  productController.createProduct
);

router.post(
  "/delete-product/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  productController.deleteProduct
);

module.exports = router;
