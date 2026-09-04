const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.get('/', authenticateToken, getApplications);
router.post('/', authenticateToken, authorize('STUDENT'), submitApplication);
router.put('/:id/status', authenticateToken, updateApplicationStatus);

module.exports = router;
