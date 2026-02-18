const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData) {
        const { email } = userData;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');
        
        return await this.userRepository.create(userData);
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await user.matchPassword(password))) {
            throw new Error('Invalid credentials');
        }
        return { user, token: this.generateToken(user._id) };
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
    }
}

module.exports = AuthService;
