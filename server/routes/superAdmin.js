const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const { requireAuth } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

// Super Admin routes strictly require super_admin role
router.use(requireAuth);
router.use(roleCheck(['super_admin']));

router.get('/clinics', superAdminController.getAllClinics);
router.get('/analytics', superAdminController.getPlatformAnalytics);

module.exports = router;
