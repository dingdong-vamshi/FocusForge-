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
        
        const hourlyMap = Array(24).fill(0).map((_, i) => ({ name: `${i}:00`, intensity: 0 }));
        const domainMap = {};

        sessions.forEach(s => {
            const h = new Date(s.startTime).getHours();
            hourlyMap[h].intensity += s.duration;

            totalTime += s.duration;
            breakdown[s.category] += s.duration;
            if (['productive', 'learning'].includes(s.category)) productiveTime += s.duration;
            if (['social', 'entertainment'].includes(s.category)) distractionTime += s.duration;

            // Track domains for top distractions
            if (!domainMap[s.domain]) domainMap[s.domain] = { domain: s.domain, duration: 0, category: s.category };
            domainMap[s.domain].duration += s.duration;
        });

        const topDistractions = Object.values(domainMap)
            .filter(d => ['social', 'entertainment'].includes(d.category))
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 3);

        const recommendations = [];
        if (distractionTime > productiveTime && totalTime > 60) {
            recommendations.push({ type: 'warning', text: 'Distractions are heavily outweighing productivity. Consider closing social media tabs.' });
        } else if (productiveTime > 120) {
            recommendations.push({ type: 'success', text: 'Great focus! You\'ve maintaining high productivity. Remember to take a break soon to prevent burnout.' });
        } else {
            recommendations.push({ type: 'info', text: 'You are off to a decent start. Keep building momentum!' });
        }
        
        if (topDistractions.length > 0) {
            recommendations.push({ type: 'danger', text: `Your biggest time sink is ${topDistractions[0].domain} (${topDistractions[0].duration}m). Consider setting a site blocker.`});
        }

        return { totalTime, productiveTime, distractionTime, breakdown, hourlyHeatmap: hourlyMap, topDistractions, recommendations };
    }
}

module.exports = AnalyticsService;
