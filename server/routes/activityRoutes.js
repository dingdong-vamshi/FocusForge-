const express = require('express');
const router = express.Router();
const activityController = require('../controllers/ActivityController');
const { protect } = require('../middlewares/authMiddleware');

const User = require('../models/User');
const ActivitySession = require('../models/ActivitySession');

router.get('/seed', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) return res.status(400).send('No users found to seed');
        
        const now = new Date();
        let count = 0;
        for (const user of users) {
            await ActivitySession.deleteMany({ userId: user._id });
            const dummySessions = [
                { userId: user._id, domain: 'github.com', title: 'Coding FocusForge', category: 'productive', startTime: new Date(now.getTime() - 120 * 60000), endTime: new Date(now.getTime() - 60 * 60000), duration: 60 },
                { userId: user._id, domain: 'stackoverflow.com', title: 'Fixing bugs', category: 'learning', startTime: new Date(now.getTime() - 50 * 60000), endTime: new Date(now.getTime() - 20 * 60000), duration: 30 },
                { userId: user._id, domain: 'youtube.com', title: 'Funny videos', category: 'entertainment', startTime: new Date(now.getTime() - 15 * 60000), endTime: now, duration: 15 },
                { userId: user._id, domain: 'twitter.com', title: 'Scrolling feed', category: 'social', startTime: new Date(now.getTime() - 200 * 60000), endTime: new Date(now.getTime() - 180 * 60000), duration: 20 },
                { userId: user._id, domain: 'vscode.dev', title: 'Editing code', category: 'productive', startTime: new Date(now.getTime() - 300 * 60000), endTime: new Date(now.getTime() - 180 * 60000), duration: 120 }
            ];
            await ActivitySession.insertMany(dummySessions);
            count++;
        }
        res.send(`Seeded data for ${count} users successfully! Please refresh your dashboard.`);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

router.post('/record', protect, activityController.record);
router.get('/sessions', protect, activityController.getSessions);

module.exports = router;
