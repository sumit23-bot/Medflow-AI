const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

// Clinic Admin routes require authentication and admin role
router.use(requireAuth);
router.use(roleCheck(['admin']));

router.get('/stats', adminController.getAdminStats);
router.get('/staff', adminController.getStaffList);
router.post('/staff', adminController.addStaffMember);
router.get('/analytics', adminController.getAdminAnalytics);

module.exports = router;
