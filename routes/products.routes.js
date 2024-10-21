const express = require("express");
const productModel = require("../models/product.model");
const upload = require("../config/multer.config")
const authMiddleware = require("../middlewares/auth.middleware")
const productController = require("../controllers/product.controller")

const router = express.Router()
router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller);

router.post("/create-product", upload.any("image"), productController.createProduct)
router.get("/product/:id", authMiddleware.isAuthenticated, productController.getProductById)

module.exports = router;
