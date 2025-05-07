const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/create', examController.createExam);

module.exports = router;