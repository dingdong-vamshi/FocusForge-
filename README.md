# FocusForge - Smart Productivity and Habit Analytics Platform

FocusForge is a production-grade full-stack productivity analytics platform. It tracks user activity, analyzes behavior patterns, generates productivity scores, and provides high-level insights into digital habits. The platform includes a specialized Chrome Extension to enable real-time tracking of browser activity.

## System Components

The platform consists of three main components working in synchronization:
1. Backend API: A Node.js and Express server that manages data persistence, authentication, and analytical processing.
2. Analytics Dashboard: A React-based web application that visualizes productivity data through interactive charts and insights.
3. Chrome Extension: A background tracker that monitors active browser tabs and securely transmits session data to the backend.

## Architecture

The backend follows Clean Architecture principles to ensure scalability, maintainability, and testability.

### Layers
- Models: Defines the data schema using Mongoose.
- Repositories: Manages database access, abstracting Mongoose queries (Repository Pattern).
- Services: Contains business logic and orchestrates data flow (Service Layer Pattern).
- Controllers: Handles HTTP requests and responses, decoupling the API from the domain logic.
- Middlewares: Handles cross-cutting concerns like Authentication (JWT) and Request Logging.

### Design Patterns Used
- Singleton Pattern: Managed by the controller and service instances.
- Factory Pattern: Used for repository and service instantiation.
- Strategy Pattern: Implemented in the AnalyticsService for pluggable productivity scoring algorithms.
- Adapter Pattern: Used to transform raw activity data from diverse sources.

## Key Features

- Real-Time Activity Tracking: Automatic recording of website domains and time spent using a browser extension.
- Advanced Analytics Dashboard: High-fidelity charts showing category distribution, productivity trends, and activity heatmaps.
- Intelligent Recommendations: Automated insights based on behavior patterns and productivity scores.
- Secure Authentication: JWT-based authentication with password hashing using Bcrypt.
- Automated Categorization: Resident logic to classify domains into Productive, Learning, Social, Entertainment, or Misc.

## Real-Time Data Extraction

FocusForge utilizes a Chrome Extension for data extraction due to browser security models. Standard web applications operate in a sandbox that prevents them from monitoring other tabs or background activity. The extension operates with elevated permissions to observe active tab changes and measure precise duration spent on different domains, ensuring accurate productivity metrics.

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Recharts, Lucide-React, Framer Motion.
- Backend: Node.js, Express.js, MongoDB, Mongoose.
- Extension: Manifest V3, JavaScript Service Workers.
- Testing: Jest, Supertest, MongoDB Memory Server.

## API Documentation

### Auth
- POST /api/auth/register - Create a new user.
- POST /api/auth/login - Authenticate and get a JWT token.

### Activity
- POST /api/activity/record - Log an activity session (Protected).
- GET /api/activity/sessions - List recent activity sessions (Protected).

### Dashboard
- GET /api/dashboard - Get aggregated analytics and score (Protected).

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a URI)
- Google Chrome Browser

### Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Setup environment variables in `server/.env`:
   ```env
   PORT=5005
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   ```
4. Run the server: `npm start`

### Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the application at `http://localhost:5173`

## Chrome Extension Installation Process

The extension allows FocusForge to collect real-time data from your browser usage.

### Installation Steps
1. Open Google Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner.
3. Click the "Load unpacked" button in the top-left.
4. Select the `extension` folder located within the FocusForge project directory.
5. The FocusForge Tracker icon should now appear in your extension list.

### Configuration
1. Click on the FocusForge extension icon in your browser toolbar.
2. Enter the API URL: `http://localhost:5005/api` (or your deployed URL).
3. Obtain your JWT Auth Token from the web application (stored in LocalStorage as 'token') and paste it into the token field.
4. Click "Save and Start Tracking".

## Running Tests
```bash
cd server
npm test
```
