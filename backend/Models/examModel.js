const db = require('../config/db');

const createExam = (examData, callback) => {
  const sql = `INSERT INTO exams (name, subject, duration, questionType, description)
               VALUES (?, ?, ?, ?, ?)`;
  const values = [
    examData.name,
    examData.subject,
    examData.duration,
    examData.questionType,
    examData.description
  ];
  db.query(sql, values, callback);
};

module.exports = { createExam };

