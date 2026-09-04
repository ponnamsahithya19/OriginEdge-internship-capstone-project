const express = require('express');
const router = express.Router();
const { getAllFaculty } = require('../controllers/facultyController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getAllFaculty);

module.exports = router;
