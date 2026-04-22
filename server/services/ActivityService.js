const ActivityRepository = require('../repositories/ActivityRepository');

class ActivityService {
    constructor() {
        this.activityRepository = new ActivityRepository();
    }

    async recordActivity(userId, activityData) {
        // Simple Adapter Logic: Ensure category is mapped correctly
        const data = {
            userId,
            ...activityData,
            duration: this.calculateDuration(activityData.startTime, activityData.endTime)
        };
        return await this.activityRepository.create(data);
    }

    calculateDuration(start, end) {
        const diff = new Date(end) - new Date(start);
        return Number((diff / 60000).toFixed(2)); // Use exact decimal minutes instead of rounding to 0 for short test sessions
    }

    async getSessions(userId) {
        return await this.activityRepository.findByUserId(userId);
    }
}

module.exports = ActivityService; 
