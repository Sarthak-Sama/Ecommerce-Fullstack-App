const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", indexController.index);

router.get("/products", authMiddleware.isAuthenticated, indexController.getAllProducts);
router.get("/order/:id", authMiddleware.isAuthenticated, indexController.createOrder);
router.get("/verify-payment/:id", authMiddleware.isAuthenticated, indexController.verifyPayment)  

router.get("/shop-dashboard", indexController.shopDashboard)
module.exports = router;