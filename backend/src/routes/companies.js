const express = require('express');
const router = express.Router();
const { getAllCompanies, verifyCompany } = require('../controllers/companyController');
const { authenticateToken, authorize } = require('../middleware/auth');

router.get('/', getAllCompanies);
router.put('/:id/verify', authenticateToken, authorize('ADMIN'), verifyCompany);

module.exports = router;
