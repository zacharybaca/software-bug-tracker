import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { EmployeesContextProvider } from './context/employeesContext.jsx';
import { TasksContextProvider } from './context/tasksContext.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <EmployeesContextProvider>
        <TasksContextProvider>
          <Router>
            <App />
          </Router>
        </TasksContextProvider>
      </EmployeesContextProvider>
  </StrictMode>
);
