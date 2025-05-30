const db = require('../config/db');

exports.insertExam = (exam, cb) => {
  const sql = `INSERT INTO exams (name, subject, duration, questionType, description) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [exam.name, exam.subject, exam.duration, exam.questionType, exam.description], cb);
};

exports.insertQuestion = (examId, q, cb) => {
  const sql = `INSERT INTO questions (exam_id, type, text, choices, correct_answer, expected_answer, media_url)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    examId,
    q.type,
    q.texte,
    q.type === 'QCM' ? JSON.stringify(q.choix) : null,
    q.type === 'QCM' ? q.bonneReponse : null,
    q.type === 'open' ? q.reponseAttendue : null,
    q.media || null
  ];
  db.query(sql, values, cb);
};

exports.getExamById = (examId, cb) => {
  const sql = `SELECT * FROM exams WHERE id = ?`;
  db.query(sql, [examId], (err, results) => {
    if (err || results.length === 0) return cb(err, null);
    cb(null, results[0]);
  });
};

exports.getQuestionsByExamId = (examId, cb) => {
  const sql = `SELECT * FROM questions WHERE exam_id = ?`;
  db.query(sql, [examId], (err, results) => {
    if (err) return cb(err);

    const fixed = results.map(q => ({
      id: q.id,
      text: q.text,
      type: q.type,
      choices: q.choices,
      correct_answer: q.correct_answer,
      expected_answer: q.expected_answer,
      media_url: q.media_url
    }));

    cb(null, fixed);
  });
};


exports.saveSubmission = ({ userId, examId, score, total }, cb) => {
  const sql = "INSERT INTO submissions (user_id, exam_id, score, total) VALUES (?, ?, ?, ?)";
  db.query(sql, [userId, examId, score, total], cb);
};
exports.getAll = (cb) => {
  db.query("SELECT * FROM exams", cb);
};

