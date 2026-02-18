const AuthService = require('../services/AuthService');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    register = async (req, res) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error('Registration Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
