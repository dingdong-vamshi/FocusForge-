const mongoose = require('mongoose');

const activitySessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    domain: { type: String, required: true },
    title: { type: String },
    category: { 
        type: String, 
        enum: ['productive', 'learning', 'social', 'entertainment', 'misc'],
        default: 'misc'
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
});

module.exports = mongoose.model('ActivitySession', activitySessionSchema);
