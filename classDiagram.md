# Class Diagram

The Class Diagram represents the object-oriented structure of the FocusForge backend system.

The system follows a layered architecture consisting of Controllers, Services, and Models.
Controllers handle HTTP requests, services contain business logic, and models represent stored data.

The **AuthController** manages authentication operations, while the **ActivityController** handles activity tracking and dashboard requests.
Service classes such as ActivityTrackerService, GoalService, ReminderService, and ReportService perform core system operations like recording activity, evaluating goals, and generating reports.

The **User** and **ActivitySession** classes represent persistent data entities stored in the database.
The Report is generated using multiple activity sessions, showing a dependency between analytics and recorded activity.

This diagram demonstrates the use of object-oriented design principles such as separation of concerns and modular system design.
