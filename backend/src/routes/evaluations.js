const express = require('express');
const router = express.Router();
const { submitEvaluation, getEvaluationByApplication } = require('../controllers/evaluationController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.get('/application/:applicationId', authenticateToken, getEvaluationByApplication);
router.post('/', authenticateToken, authorize('FACULTY', 'COMPANY', 'ADMIN'), submitEvaluation);

module.exports = router;
