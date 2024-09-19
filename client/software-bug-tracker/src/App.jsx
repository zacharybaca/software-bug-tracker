import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import EmployeeDirectory from './components/EmployeeDirectory/EmployeeDirectory';
import Footer from './components/Footer/Footer';
import { EmployeesContext } from './context/employeesContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import logo from './assets/issue-insight-logo.png';
import React from 'react';
import './App.css'

function App() {
  const context = React.useContext(EmployeesContext);
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
          {Object.keys(context.userState.user).length !== 0 ? <h1>Welcome {context.userState.user.userID}</h1> : ""}
        </div>
        
        <Routes>
          <Route path="/" element={Object.keys(context.userState.user).length !== 0 ? <Navigate to="/personal-tasks"/> : <LandingPage />} />

          <Route
            path="/tasks"
            element={ 
                    <TaskList />
            }
          />

          <Route
            path="/employee-directory"
            element={
                  <EmployeeDirectory />
            }
          />

          <Route
            path="/add-employee"
            element={
                <EmployeeForm />
            }
          />

          <Route
            path="/sign-up"
            element={
                <SignUpForm />
            }
          />
        </Routes>
        <Footer />
      </div>
    )
  );
}

export default App
