const Exam = require('../Models/examModel');

// Créer un examen
exports.createExam = (req, res) => {
  const { name, subject, duration, questionType, description } = req.body;

  if (!name || !subject || !duration || !questionType) {
    return res.status(400).json({ error: "Champs requis manquants." });
  }

  const examData = { name, subject, duration, questionType, description };

  Exam.insertExam(examData, (err, result) => {
    if (err) {
      console.error("Erreur insertion exam:", err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    const examLink = `http://localhost:5500/frontend/PasserExam.html?examId=${result.insertId}`;
    res.status(201).json({
      message: 'Examen créé.',
      examId: result.insertId,
      examLink
    });
  });
};

// Enregistrer les questions d'un examen
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

// Récupérer un examen complet avec ses questions
exports.getFullExam = (req, res) => {
  const examId = req.params.id;

  Exam.getExamById(examId, (err, exam) => {
    if (err || !exam) {
      return res.status(404).json({ error: 'Examen introuvable.' });
    }

    Exam.getQuestionsByExamId(examId, (err, questions) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur.' });
      }

      res.json({ exam, questions });
    });
  });
};

// Soumettre un examen et calculer le score
exports.submitExam = (req, res) => {
  const examId = req.params.examId;
  const { userId, answers } = req.body;

  Exam.getQuestionsByExamId(examId, (err, questions) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });

    let score = 0;
    let total = questions.length;

    answers.forEach(rep => {
      const q = questions.find(q => q.id == rep.questionId);
      if (!q) return;

      if (q.type === 'QCM' && rep.answer === q.correct_answer) {
        score++;
      } else if (q.type === 'open') {
        const correct = (q.expected_answer || "").trim().toLowerCase();
        const given = (rep.answer || "").trim().toLowerCase();
        if (given === correct) score++;
      }
    });

    Exam.saveSubmission({ examId, userId, score, total }, (err2) => {
      if (err2) return res.status(500).json({ error: "Erreur enregistrement résultat" });
      res.json({ message: "Examen soumis", score, total });
    });
  });
};

//  Récupérer tous les examens (liste)
exports.getAllExams = (req, res) => {
  Exam.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération examens" });
    res.json(results);
  });
};
