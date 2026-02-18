const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    totalTime: { type: Number, required: true },
    productiveTime: { type: Number, required: true },
    distractionTime: { type: Number, required: true },
    score: { type: Number, required: true },
    categoryBreakdown: { type: Map, of: Number },
    topDomains: [{ domain: String, time: Number }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
