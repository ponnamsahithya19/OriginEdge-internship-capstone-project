const express = require('express');
const router = express.Router();
const { getAllInternships, getInternshipById, createInternship, updateInternship } = require('../controllers/internshipController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.get('/', getAllInternships);
router.get('/:id', getInternshipById);
router.post('/', authenticateToken, authorize('COMPANY', 'ADMIN'), createInternship);
router.put('/:id', authenticateToken, authorize('COMPANY', 'ADMIN'), updateInternship);

module.exports = router;
