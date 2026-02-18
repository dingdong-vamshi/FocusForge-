const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String, 
        enum: ['daily_screen_time', 'category_limit'], 
        required: true 
    },
    targetValue: { type: Number, required: true }, // in minutes
    category: { type: String }, // Required if type is 'category_limit'
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);
