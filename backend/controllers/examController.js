const Exam = require('../Models/examModel');

exports.createExam = (req, res) => {
  const { nom, matiere, duree, questionType, description } = req.body;

  // Basic validation (optional but helpful)
  if (!nom || !matiere || !duree || !questionType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const examData = {
    name: nom,
    subject: matiere,
    duration: duree,
    questionType,
    description: description || '' // optional
  };

  Exam.createExam(examData, (err, result) => {
    if (err) {
      console.error('Error creating exam:', err);
      return res.status(500).json({ error: 'Database error while creating exam' });
    }

    res.status(201).json({
      message: 'Exam created successfully',
      examId: result.insertId
    });
  });
};
