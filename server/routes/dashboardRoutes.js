const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, dashboardController.getStats);

module.exports = router;
