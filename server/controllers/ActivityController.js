const ActivityService = require('../services/ActivityService');

class ActivityController {
    constructor() {
        this.activityService = new ActivityService();
    }

    record = async (req, res) => {
        try {
            const session = await this.activityService.recordActivity(req.user.id, req.body);
            res.status(201).json(session);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getSessions = async (req, res) => {
        try {
            const sessions = await this.activityService.getSessions(req.user.id);
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ActivityController();
