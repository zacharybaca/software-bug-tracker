import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import EmployeeDirectory from './components/EmployeeDirectory/EmployeeDirectory';
import { TasksContextProvider } from './context/tasksContext';
import { EmployeesContextProvider } from './context/employeesContext';
import { Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css'

function App() {
  

  return (
    <div id="app-container">
      <div id="application-logo-container">
        <img src={logo} alt="logo" id="logo"/>
        <h1 id="application-title-heading">Issue Insight</h1>
      </div>
      
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

        <Route path="/employee-directory" element={
          <TasksContextProvider>
            <EmployeesContextProvider>
              <EmployeeDirectory />
            </EmployeesContextProvider>
          </TasksContextProvider>
        }
        />

        <Route
          path="/add-employee"
          element={
            <>
              <EmployeesContextProvider>
                <EmployeeForm />
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
