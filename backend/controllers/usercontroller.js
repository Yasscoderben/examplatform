const Exam = require('../models/examModel');

exports.createExam = (req, res) => {
  const { nom, matiere, duree, questionType, description } = req.body;

  const examData = {
    name: nom,
    subject: matiere,
    duration: duree,
    questionType,
    description
  };

  Exam.insertExam(examData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.status(201).json({ message: 'Examen créé.', examId: result.insertId });
  });
};

exports.saveQuestions = (req, res) => {
  const examId = req.params.examId;
  const { questions } = req.body;

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'Format des questions invalide.' });
  }

  let done = 0;

  questions.forEach((q) => {
    Exam.insertQuestion(examId, q, (err) => {
      if (err) console.error(err);
      done++;
      if (done === questions.length) {
        res.status(200).json({ message: 'Questions enregistrées.' });
      }
    });
  });
};
