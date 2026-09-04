const express = require('express');
const router = express.Router();
const { submitLogbook, getLogbooksByApplication, updateLogbookFeedback } = require('../controllers/logbookController');
const { authenticateToken } = require('../middleware/auth');

router.get('/application/:applicationId', authenticateToken, getLogbooksByApplication);
router.post('/', authenticateToken, submitLogbook);
router.put('/:id/feedback', authenticateToken, updateLogbookFeedback);

module.exports = router;
