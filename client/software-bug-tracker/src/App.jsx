import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import EmployeeDirectory from './components/EmployeeDirectory/EmployeeDirectory';
import Footer from './components/Footer/Footer';
import { TasksContextProvider } from './context/tasksContext';
import { EmployeesContextProvider } from './context/employeesContext';
import { Routes, Route } from 'react-router-dom';
import logo from './assets/issue-insight-logo.png';
import React from 'react';
import './App.css'

function App() {
  const [loading,setLoading] = React.useState(true);
  const loader = document.getElementById('gear-loader');

  if (loader) {
    setTimeout(() => {
      loader.style.display = 'none';
      setLoading(false);
    }, 3000)
  }

  return (
    !loading && (
      <div id="app-container">
        <div id="application-logo-container">
          <img src={logo} alt="logo" id="logo" />
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

          <Route
            path="/employee-directory"
            element={
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
        <Footer />
      </div>
    )
  );
}

export default App
