const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');

router.get('/dashboard', authenticateToken, getDashboardAnalytics);

module.exports = router;
