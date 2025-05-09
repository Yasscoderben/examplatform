// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const examRoutes = require('./routes/examRoutes'); 
const authRoutes = require('./routes/userroutes'); 

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/exams', examRoutes);
app.use('/api/auth', authRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
