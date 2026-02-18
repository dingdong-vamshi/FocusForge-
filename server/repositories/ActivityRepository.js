const BaseRepository = require('./BaseRepository');
const ActivitySession = require('../models/ActivitySession');

class ActivityRepository extends BaseRepository {
    constructor() {
        super(ActivitySession);
    }

    async findByUserId(userId) {
        return await this.model.find({ userId }).sort({ startTime: -1 });
    }

    async findByDateRange(userId, start, end) {
        return await this.model.find({
            userId,
            startTime: { $gte: start, $lte: end }
        });
    }
}

module.exports = ActivityRepository;
