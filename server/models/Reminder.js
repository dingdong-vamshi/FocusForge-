const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['break', 'limit_reached', 'system'], 
        default: 'system' 
    },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reminder', reminderSchema);
