const AnalyticsService = require('../services/AnalyticsService');

class DashboardController {
    constructor() {
        this.analyticsService = new AnalyticsService();
    }

    getStats = async (req, res) => {
        try {
            const stats = await this.analyticsService.getDashboardStats(req.user.id);
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DashboardController();
