const express = require('express');
const router = express.Router();
const activityController = require('../controllers/ActivityController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/record', protect, activityController.record);
router.get('/sessions', protect, activityController.getSessions);

module.exports = router;
