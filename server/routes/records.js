const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const { requireAuth } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

// Records accessible by clinic staff, doctors, pharmacists, and admins
router.use(requireAuth);
router.use(roleCheck(['staff', 'doctor', 'pharmacist', 'admin']));

router.get('/search', recordsController.searchRecords);
router.get('/:patientId', recordsController.getPatientFullHistory);

module.exports = router;
