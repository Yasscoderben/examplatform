const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/create', examController.createExam);
router.post('/:examId/questions', examController.saveQuestions);

module.exports = router;
