const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Créer un examen
router.post('/create', examController.createExam);

// Enregistrer les questions
router.post('/:examId/questions', examController.saveQuestions);

// Récupérer l'examen complet
router.get('/:id/full', examController.getFullExam); 

// Soumettre un examen
router.post('/:examId/submit', examController.submitExam);

module.exports = router;
