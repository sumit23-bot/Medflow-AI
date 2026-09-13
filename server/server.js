const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for dev
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'MedFlow AI API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Import route modules
const authRoutes = require('./routes/auth');
const kioskRoutes = require('./routes/kiosk');
const doctorRoutes = require('./routes/doctor');
const pharmacyRoutes = require('./routes/pharmacy');
const recordsRoutes = require('./routes/records');
const adminRoutes = require('./routes/admin');
const superAdminRoutes = require('./routes/superAdmin');
const leadsRoutes = require('./routes/leads');

// Wire routes with prefixes (Step 36)
app.use('/api/auth', authRoutes);
app.use('/api/kiosk', kioskRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/leads', leadsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start listening if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ MedFlow AI Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
