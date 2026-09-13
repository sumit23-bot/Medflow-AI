const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');

// Public endpoint for marketing site lead capture (no auth)
router.post('/', leadsController.createLead);

module.exports = router;
