// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/usercontroller');

rorouter.post('/register', userController.signup); 
router.post('/login', userController.login);     

module.exports = router;
