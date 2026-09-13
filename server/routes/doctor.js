const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { requireAuth } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

// All doctor routes require authentication and doctor or admin role
router.use(requireAuth);
router.use(roleCheck(['doctor', 'admin']));

router.get('/queue', doctorController.getDoctorQueue);
router.get('/patient/:id', doctorController.getPatientDetail);
router.post('/prescription', doctorController.submitPrescription);

module.exports = router;
