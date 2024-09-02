import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import { TasksContextProvider } from './context/tasksContext';
import { EmployeesContextProvider } from './context/employeesContext';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <div id="app-container">
      <h1 id="application-title-heading">Issue Insight</h1>
      <div id="action-buttons">
        <Link to="/add-task">
          <button type="button" id="add-task-main-button">
            Add Task
          </button>
        </Link>
        <Link to="/add-employee">
          <button type="button" id="add-employee-main-button">
            Add Employee
          </button>
        </Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TasksContextProvider>
                <TaskList />
              </TasksContextProvider>
            </>
          }
        />

        <Route
          path="/add-task"
          element={
            <>
              <TasksContextProvider>
                <TaskForm buttonText={"Add Task"} />
              </TasksContextProvider>
            </>
          }
        />
        <Route
          path="/add-employee"
          element={
            <>
              <EmployeesContextProvider>
                <EmployeeForm buttonText={"Add Employee"} />
              </EmployeesContextProvider>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App
