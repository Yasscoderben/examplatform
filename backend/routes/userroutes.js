// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', userControllers.registerUser);

router.post('/login', usercontroller.loginUser);

module.exports = router;
