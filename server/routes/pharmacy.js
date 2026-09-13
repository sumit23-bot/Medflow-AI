const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const { requireAuth } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

// Pharmacy routes require authentication and pharmacist or admin role
router.use(requireAuth);
router.use(roleCheck(['pharmacist', 'admin']));

router.get('/queue', pharmacyController.getPharmacyQueue);
router.post('/dispense/:visitId', pharmacyController.dispenseMedicine);

module.exports = router;
