const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDB } = require('./config/db');
const errorHandler = require('./middleware/error');

// Route imports
const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');
const applicationRoutes = require('./routes/applications');
const logbookRoutes = require('./routes/logbooks');
const evaluationRoutes = require('./routes/evaluations');
const companyRoutes = require('./routes/companies');
const facultyRoutes = require('./routes/faculty');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Enterprise Internship Management System API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/logbooks', logbookRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Centralized Error Handler
app.use(errorHandler);

// Start Server & Initialize Database
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Enterprise Internship Backend API Server running on port ${PORT}`);
    console.log(`🌐 Health check endpoint: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('❌ Failed to start Backend Server:', err);
});
