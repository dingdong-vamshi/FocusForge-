const BaseRepository = require('./BaseRepository');
const Goal = require('../models/Goal');

class GoalRepository extends BaseRepository {
    constructor() {
        super(Goal);
    }

    async findActiveByUserId(userId) {
        return await this.model.find({ userId, active: true });
    }
}

module.exports = GoalRepository;
