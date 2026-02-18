const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const user = await User.create({
        name: 'Analytics User',
        email: 'analytics@example.com',
        password: 'password123'
    });
    userId = user._id;

    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'analytics@example.com', password: 'password123' });
    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Activity & Dashboard API', () => {
    it('should record an activity session', async () => {
        const res = await request(app)
            .post('/api/activity/record')
            .set('Authorization', `Bearer ${token}`)
            .send({
                domain: 'github.com',
                category: 'productive',
                startTime: new Date(Date.now() - 3600000), // 1 hour ago
                endTime: new Date()
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.duration).toEqual(60);
    });

    it('should get dashboard stats', async () => {
        const res = await request(app)
            .get('/api/dashboard')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('productivityScore');
        expect(res.body.totalTime).toBeGreaterThanOrEqual(60);
    });
});
