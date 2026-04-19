const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/focusforge';
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 2000 // Short timeout to trigger fallback quickly
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`Local MongoDB connection failed: ${error.message}`);
        console.info('Attempting to start In-Memory Database for demonstration...');
        
        try {
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log('Using In-Memory Database (Demo Mode)');
        } catch (innerError) {
            console.error(`Fatal DB Error: ${innerError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
