const Exam = require('../models/examModel');

exports.addQuestions = (req, res) => {
  const examId = req.params.examId;
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Aucune question fournie." });
  }

  let inserted = 0;

  questions.forEach((q) => {
    Exam.insertQuestion(q, examId, (err) => {
      if (err) {
        console.error('Erreur insertion question:', err);
      }
      inserted++;
      if (inserted === questions.length) {
        res.status(201).json({ message: "Questions ajoutées avec succès." });
      }
    });
  });
};
