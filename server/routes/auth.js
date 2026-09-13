const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

// Public auth endpoints
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Protected auth endpoint
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
