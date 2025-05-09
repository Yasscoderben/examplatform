// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/usercontroller');

router.post('/register', authController.signup);
router.post('/login', authController.login);     

module.exports = router;
