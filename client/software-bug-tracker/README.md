# Software Bug Tracker - Frontend Documentation

## Overview
The frontend of the **Software Bug Tracker** is built using **React** with **Vite** for fast development and optimized builds. It manages user authentication, task tracking, employee management, and real-time messaging.

## Tech Stack
- **React** (UI Framework)
- **Vite** (Build Tool)
- **React Router** (Client-side routing)
- **Context API** (Global state management)
- **WebSockets** (Real-time messaging)
- **JWT Authentication**
- **Mongoose & MongoDB (via API)**
- **EmailJS** (Email integration)

## Folder Structure
```
client/software-bug-tracker/src/
│-- assets/               # Static assets like images
│-- components/           # Reusable UI components
│-- context/              # Global state management with Context API
│-- pages/                # Page-level components (routes)
│-- services/             # API calls and helper functions
│-- utils/                # Utility functions
│-- App.jsx               # Main app component
│-- main.jsx              # Entry point for React
```

## Key Components
### `components/`
- **EmployeeBadge.jsx** - Displays an employee's profile info
- **EmployeeDirectory.jsx** - Lists all employees
- **TaskForm.jsx** - Form for creating/editing tasks
- **LiveSupport.jsx** - WebSocket-powered real-time chat feature

### `context/`
- **EmployeesContext.jsx** - Manages employee-related state
- **TasksContext.jsx** - Manages task-related state
- **AuthContext.jsx** - Handles authentication and user sessions

### `pages/`
- **Dashboard.jsx** - Main page displaying tasks and employees
- **Login.jsx** - Handles user authentication
- **SignUp.jsx** - Allows new users to create an account

## API Interaction
- **Authentication**
  - Login and token storage in `localStorage`
- **Tasks API**
  - CRUD operations for tasks
  - Task assignment and filtering
- **Employees API**
  - Fetching employee data
  - Profile image uploads

## WebSockets
The `LiveSupport` component connects to the WebSocket server to send and receive chat messages in real-time. WebSocket events manage online users and instant updates.

## Deployment
- Uses **Render** for backend hosting
- Frontend deployment: **Netlify/Vercel (TBD)**

## Future Enhancements
- Improve task filtering & search functionality
- Enhance real-time notifications for task updates
- Expand role-based access controls
