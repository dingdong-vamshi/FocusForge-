# Use Case Diagram

The Use Case Diagram illustrates the functional behavior of the FocusForge system and the interactions between actors and system features.

The primary actor is the **User**, who can register, log in, view the dashboard, view reports, set productivity goals, manage reminders, and start focus sessions.
The secondary actor is the **Activity Tracker**, which automatically sends user activity data to the system.

The system internally performs operations such as recording activity, categorizing domains, calculating productivity scores, checking goal limits, triggering alerts, and generating daily reports.

The <<include>> relationships represent internal system processes required to provide services to the user.
This diagram defines the system boundary and clearly separates user actions from automated system behavior.
