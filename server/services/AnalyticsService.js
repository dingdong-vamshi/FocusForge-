const ActivityRepository = require('../repositories/ActivityRepository');
const StandardScoringStrategy = require('./scoring/StandardScoringStrategy');

class AnalyticsService {
    constructor() {
        this.activityRepository = new ActivityRepository();
        this.scoringStrategy = new StandardScoringStrategy();
    }

    async getDashboardStats(userId) {
        const sessions = await this.activityRepository.findByUserId(userId);
        const stats = this.processSessions(sessions);
        const score = this.scoringStrategy.calculate(stats.productiveTime, stats.totalTime);
        
        return { ...stats, productivityScore: score };
    }

    processSessions(sessions) {
        let totalTime = 0, productiveTime = 0, distractionTime = 0;
        const breakdown = { productive: 0, learning: 0, social: 0, entertainment: 0, misc: 0 };

        sessions.forEach(s => {
            totalTime += s.duration;
            breakdown[s.category] += s.duration;
            if (['productive', 'learning'].includes(s.category)) productiveTime += s.duration;
            if (['social', 'entertainment'].includes(s.category)) distractionTime += s.duration;
        });

        return { totalTime, productiveTime, distractionTime, breakdown };
    }
}

module.exports = AnalyticsService;
