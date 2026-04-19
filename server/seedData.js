require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const ActivitySession = require('./models/ActivitySession');
const connectDB = require('./config/db');

async function seedData() {
    await connectDB();
    console.log('Connected to DB for seeding...');

    // Get all users
    const users = await User.find();
    
    if (users.length === 0) {
        console.error('No users found! Please register a user in the UI first.');
        process.exit(1);
    }

    const now = new Date();
    let totalSessions = 0;

    for (const user of users) {
        // Clear existing activities to avoid duplicates if run multiple times
        await ActivitySession.deleteMany({ userId: user._id });
        
        // Create some dummy sessions
        const dummySessions = [
            {
                userId: user._id,
                domain: 'github.com',
                title: 'Coding FocusForge',
                category: 'productive',
                startTime: new Date(now.getTime() - 120 * 60000), // 2 hours ago
                endTime: new Date(now.getTime() - 60 * 60000),   // 1 hour ago
                duration: 60
            },
            {
                userId: user._id,
                domain: 'stackoverflow.com',
                title: 'How to fix React errors',
                category: 'learning',
                startTime: new Date(now.getTime() - 50 * 60000), // 50 mins ago
                endTime: new Date(now.getTime() - 20 * 60000),   // 20 mins ago
                duration: 30
            },
            {
                userId: user._id,
                domain: 'youtube.com',
                title: 'Funny videos',
                category: 'entertainment',
                startTime: new Date(now.getTime() - 15 * 60000), // 15 mins ago
                endTime: now,
                duration: 15
            },
            {
                userId: user._id,
                domain: 'twitter.com',
                title: 'Scrolling feed',
                category: 'social',
                startTime: new Date(now.getTime() - 200 * 60000), 
                endTime: new Date(now.getTime() - 180 * 60000),
                duration: 20
            },
            {
                userId: user._id,
                domain: 'vscode.dev',
                title: 'Editing code',
                category: 'productive',
                startTime: new Date(now.getTime() - 300 * 60000),
                endTime: new Date(now.getTime() - 180 * 60000),
                duration: 120
            }
        ];

        await ActivitySession.insertMany(dummySessions);
        totalSessions += dummySessions.length;
        console.log(`Seeded activities for user: ${user.email}`);
    }

    console.log(`Successfully seeded ${totalSessions} activity sessions in total!`);
    process.exit(0);
}

seedData().catch(err => {
    console.error('Error during seeding:', err);
    process.exit(1);
});
