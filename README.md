# Software Bug Tracker

This is a full-stack web application designed for managing software development tasks and tracking bugs. The application allows users to create, assign, and update tasks. It's particularly useful for teams, providing tools to manage tasks between employees and managers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)

## Features

- **Task Management**: Users can create, view, edit, and delete tasks.
- **Employee Management**: Managers can manage employee details.
- **Authentication**: Secure login using JWT tokens.
- **Role-Based Access**: Employees and managers have different access permissions.
- **Task Filters**: View tasks based on their completion status (completed or incomplete).

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v14.x or later
- **npm**: v6.x or later
- **MongoDB**: A running MongoDB instance, either local or cloud-based (e.g., MongoDB Atlas)
- **Git**: To clone the repository
- **Vite**: For Frontend Development
- **Render**: Hosting For Deployment

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zacharybaca/software-bug-tracker.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd software-bug-tracker
   ```

3. **Install backend dependencies**:
   ```bash
   npm install
   ```

4. **Navigate to the frontend directory**:
   ```bash
   cd client

5. **Install frontend dependencies**:
   ```bash
   npm install
   ```

6. **Create a <code>.env</code> file in the root directory with the following contents**:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=9000
   NODE_ENV=development
   ```

7. **Optional: If using MongoDB locally, ensure the service is running**:
   ```bash
   mongod
   ```

## Running the Application

1. **Start the backend server**:
   ```bash
   npm run start
   ```

2. **Start the frontend development server**:
   ```bash
   cd client
   npm start
   ```
   
- The backend API will run at <code>http://localhost:9000</code>.
- The frontend will be accessible at <code>http://localhost:3000</code>.


# API Documentation

## Task Management

   1. Get All Tasks
      - <code>GET /api/tasks</code>
      - Retrieves a list of all tasks.
      - Example Response:
         ```bash
         [
            {
               "_id": "taskId123",
               "title": "Fix login issue",
               "description": "Resolve authentication bug in login",
               "assignedEmployee": "employeeId456",
               "taskCompleted": false
            }
         ]

   2. Get a Specific Task
      - <code>GET /api/tasks/:id</code>
      - Retrieves a task by its unique ID.

   3. Create a New Task
      - <code>POST /api/tasks</code>
      - Requires the task data in the request body.
      - Example Request Body:
         ```bash
         {
            "title": "Fix CSS issue",
            "description": "Resolve layout alignment",
            "assignedEmployee": "employeeId456"
         }

   4. Update an Existing Task
      - <code>PUT /api/tasks/:id</code>
      - Updates the details of an existing task.

   5. Delete a Task
      - <code>DELETE /api/tasks/:id</code>
      - Deletes a task by ID.

   6. Retrieve Unassigned Tasks
      - <code>GET /api/tasks/unassigned</code>
      - Retrieves All Tasks That Hasn't Been Assigned An Employee

## Employee Management
   
   1. Get All Employees
      - <code>GET /api/employees</code>
      - Retrieves a list of all employees.

   2. Get a Specific Employee
      - <code>GET /api/employees/:id</code>
      - Retrieves employee details by their unique ID.

   3. Update an Employee's Information
      - <code>PUT /api/employees/:id</code>
      - Updates employee details by their unique ID.

   4. Delete an Employee
      - <code>DELETE /api/employees/:id</code>
      - Deletes an employee from the system, as well as unassign the tasks that employee was assigned.

## Authentication

   1. Login
      - <code>POST /api/auth/login</code>
      - Authenticates the user and returns a JWT token.
      - Example Request Body:
         ```bash
         {
            "email": "user@example.com",
            "password": "password123"
         }

   2. Register A New Employee in the System
      - <code>POST /api/employees/signup</code>
      - Adds a new employee to the database.

## WebSocket Messaging
   1. Server That Provides Real Time Communication for the Built-In Messaging System
      - <code>ws://localhost:9000</code>
      - Real-time chat communication and user online status updates.

# Project Structure
  - Structure of How Project File System is Set Up
   ```bash
   software-bug-tracker/
   ├── client/               # Frontend (React with Vite)
   ├── server/               # Backend (Node.js + Express)
   ├── models/               # Mongoose schemas for tasks and employees
   ├── routes/               # API route definitions
   ├── utils/                # Helper functions and middlewares
   └── README.md             # Project documentation
   ```

# Deployment
   1. The application is deployed on Render.
      - Configure the environment variables on Render to match your <code>.env</code> file.

# Future Enhancements
   - Email Notifications: Notify users when tasks are assigned or updated.
   - Improved Task Filters: Filter tasks by priority and due dates.
   - Reporting: Generate reports on task completion and employee performance.
   - Comments: Add a commenting system to tasks for better communication.