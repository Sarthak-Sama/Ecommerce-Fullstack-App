const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);


// Protected routes
router.post('/signout', authMiddleware.isAuthenticated, userController.signout);
router.get('/profile', authMiddleware.isAuthenticated, userController.profile);



module.exports = router;
