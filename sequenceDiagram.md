# Sequence Diagram

The Sequence Diagram shows the runtime interaction between system components when a user accesses the dashboard.

The process begins when the user requests the dashboard through the frontend application.
The frontend sends a request to the API Controller with a JWT token for authentication.
The Auth Service verifies the token and returns the user identity.

After successful authentication, the Activity Service retrieves user activity sessions from the database and calculates productivity metrics.
The system generates a daily report and stores it in the database.

Finally, the API Controller sends the report data back to the frontend, and the dashboard analytics are displayed to the user.
If authentication fails, the system returns an unauthorized response and redirects the user to the login page.

This diagram demonstrates the layered architecture of the backend, including controller, service, and database communication.
