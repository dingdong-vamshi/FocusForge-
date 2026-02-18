# FocusForge – Smart Productivity & Habit Analytics Platform

FocusForge is a production-grade full-stack productivity analytics platform. It tracks user activity, analyzes behavior patterns, generates productivity scores, and provides high-level insights into digital habits.

## 🏗️ Architecture

The backend follows **Clean Architecture** principles to ensure scalability, maintainability, and testability.

### Layers:
- **Models**: Defines the data schema using Mongoose.
- **Repositories**: Manages database access, abstracting Mongoose queries (Repository Pattern).
- **Services**: Contains business logic and orchestrates data flow (Service Layer Pattern).
- **Controllers**: Handles HTTP requests and responses, decoupling the API from the domain logic.
- **Middlewares**: Handles cross-cutting concerns like Authentication (JWT) and Request Logging.

### Design Patterns Used:
- **Singleton Pattern**: Managed by the controller and service instances.
- **Factory Pattern**: Used for repository and service instantiation.
- **Strategy Pattern**: Implemented in the `AnalyticsService` for pluggable productivity scoring algorithms.
- **Adapter Pattern**: Used to transform raw activity data from diverse sources.

## 🚀 Key Features

- **Activity Tracking**: Record website domains and app usage with automatic residency categorization.
- **Analytics Dashboard**: High-fidelity charts showing category distribution and productivity trends.
- **Productivity Scoring**: Calculated based on weighted categories:
  - `Productive/Learning` (+100%)
  - `Social/Entertainment` (0%)
  - `Misc` (Neutral)
- **Secure Authentication**: JWT-based auth with password hashing using Bcrypt.
- **Testing**: Comprehensive integration test suite using Jest and Supertest.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Recharts, Lucide-React.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Testing**: Jest, Supertest, MongoDB Memory Server.

## 📖 API Documentation

### Auth
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate and get a JWT token.

### Activity
- `POST /api/activity/record` - Log an activity session (Protected).
- `GET /api/activity/sessions` - List recent activity sessions (Protected).

### Dashboard
- `GET /api/dashboard` - Get aggregated analytics and score (Protected).

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a URI)

### Setup
1. Clone the repository.
2. Setup environment variables in `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/focusforge
   JWT_SECRET=yoursecret
   ```
3. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. Run Backend:
   ```bash
   cd server && npm start
   ```
5. Run Frontend:
   ```bash
   cd client && npm run dev
   ```

## 🧪 Running Tests
```bash
cd server
npm test
```
