const Exam = require('../Models/examModel');

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

exports.getFullExam = (req, res) => {
  const examId = req.params.examId;

  Exam.getExamById(examId, (err, exam) => {
    if (err || !exam) {
      return res.status(404).json({ error: 'Examen introuvable.' });
    }

    Exam.getQuestionsByExamId(examId, (err, questions) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur.' });
      }

      res.json({
        exam,
        questions
      });
    });
  });
};
exports.submitExam = (req, res) => {
  const examId = req.params.examId;
  const { answers } = req.body;

  Exam.getQuestionsByExamId(examId, (err, questions) => {
    if (err) {
      return res.status(500).json({ error: "Erreur récupération des questions." });
    }

    let score = 0;
    let total = questions.length;

    answers.forEach((rep) => {
      const question = questions.find(q => q.id == rep.questionId);
      if (!question) return;

      if (question.type === "QCM") {
        if (rep.answer === question.correct_answer) {
          score++;
        }
      } else if (question.type === "open") {
        if (rep.answer.trim().toLowerCase() === (question.expected_answer || "").trim().toLowerCase()) {
          score++;
        }
      }
    });

    res.json({ score, total });
  });
};
const Exam = require('../Models/examModel');

exports.createExam = (req, res) => { ... };

exports.saveQuestions = (req, res) => { ... };

exports.getFullExam = (req, res) => { ... };

exports.submitExam = (req, res) => {
  const examId = req.params.examId;
  const { answers } = req.body;

  Exam.getQuestionsByExamId(examId, (err, questions) => {
    if (err) {
      return res.status(500).json({ error: "Erreur récupération des questions." });
    }

    let score = 0;
    let total = questions.length;

    answers.forEach((rep) => {
      const question = questions.find(q => q.id == rep.questionId);
      if (!question) return;

      if (question.type === "QCM") {
        if (rep.answer === question.correct_answer) {
          score++;
        }
      } else if (question.type === "open") {
        if (rep.answer.trim().toLowerCase() === (question.expected_answer || "").trim().toLowerCase()) {
          score++;
        }
      }
    });

    res.json({ score, total });
  });
};

