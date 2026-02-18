const BaseRepository = require('./BaseRepository');
const Report = require('../models/Report');

class ReportRepository extends BaseRepository {
    constructor() {
        super(Report);
    }

    async findLatestByUserId(userId) {
        return await this.model.findOne({ userId }).sort({ date: -1 });
    }

    async findByDate(userId, date) {
        return await this.model.findOne({ userId, date });
    }
}

module.exports = ReportRepository;
