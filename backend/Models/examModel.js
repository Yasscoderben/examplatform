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
  db.query(sql, [examId], cb);
};
