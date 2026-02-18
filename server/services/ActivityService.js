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
        return Math.floor(diff / 60000); // ms to minutes
    }

    async getSessions(userId) {
        return await this.activityRepository.findByUserId(userId);
    }
}

module.exports = ActivityService;
