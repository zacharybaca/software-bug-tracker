

# Bug Tracking System for Software Engineers

This web application allows employees, who are on the software engineering team of a software company, be able to update on how far along they are with completing tasks. In a future update, there will be a login system where managers will be able to assign tasks to certain employees, and those employees will be able to see only their tasks that are assigned to them.

## Features

- **Create Tasks**: Users can create new tasks to the system.
- **View Tasks**: All tasks are displayed in a list.
- **Delete Tasks**: Users can remove tasks from the system.
- **Edit Tasks**: Users can update existing tasks with new information.
- **View Tasks By Id**: Users can view tasks based on their ID.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zacharybaca/software-bug-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd software-bug-tracker
   ```

3. Install dependencies for both the client and server:

   ```bash
   npm install
   ```

### Running the Application

1. Start the server:

   ```bash
   npm run start
   ```

2. Start the React development server:

   ```bash
   npm run start
   ```

The application will be running on `http://localhost:3000` by default, with the backend API available on `http://localhost:9000`.

## API Endpoints

- **GET /api/tasks**: Retrieve a list of all tasks.
- **POST /api/taks**: Add a new task.
- **DELETE /api/tasks/:id**: Delete a task by ID.
- **PUT /api/tasks/:id**: Update a task by ID.
- **GET /api/tasks/id**: Get a task by its ID.