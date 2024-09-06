import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import { TasksContextProvider } from './context/tasksContext';
import { EmployeesContextProvider } from './context/employeesContext';
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <div id="app-container">
      <h1 id="application-title-heading">Issue Insight</h1>

      <Routes>
        <Route path="/" element={<LandingPage buttonText={"Login"} />} />
        <Route
          path="/tasks"
          element={
            <>
              <EmployeesContextProvider>
                <TasksContextProvider>
                  <TaskList />
                </TasksContextProvider>
              </EmployeesContextProvider>
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
        <Route
          path="/sign-up"
          element={
            <>
              <EmployeesContextProvider>
                <SignUpForm />
              </EmployeesContextProvider>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App
