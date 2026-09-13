const express = require('express');
const router = express.Router();
const kioskController = require('../controllers/kioskController');

// Public kiosk endpoints (no login required, kiosk operates in-clinic)
router.post('/symptom', kioskController.submitSymptom);
router.post('/token', kioskController.issueToken);

module.exports = router;
