const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controllers");
const authMiddleware = require("../middlewares/auth.middleware")


router.get("/dashboard", adminController.getAllBlacklistedShops)


