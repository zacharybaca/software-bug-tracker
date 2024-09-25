import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import EmployeeDirectory from './components/EmployeeDirectory/EmployeeDirectory';
import Footer from './components/Footer/Footer';
import UnauthorizedPage from './components/UnauthorizedPage/UnauthorizedPage';
import { EmployeesContext } from './context/employeesContext';
import { TasksContext } from './context/tasksContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import logo from './assets/issue-insight-logo.png';
import React from 'react';
import './App.css'

function App() {
  const context = React.useContext(EmployeesContext);
  const { token } = context.userState;
  const taskContext = React.useContext(TasksContext);
  const {completed, incomplete} = taskContext.getTaskCounts;
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
          {Object.keys(context.userState.user).length !== 0 ? (
            <>
            <h2 id="user-welcome-heading">
              Welcome {context.findName(context.userState.user.userID)}
            </h2>
            <h4 id="info-heading">You Have {completed} Completed {completed === 1 ? "Task" : "Tasks"} and {incomplete} Incompleted {incomplete === 1 ? "Task" : "Tasks"}.</h4>
            </>
          ) : (
            ""
          )}
          {Object.keys(context.userState.user).length !== 0 ? (
            <button type="button" id="logout-button" onClick={context.logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={
              context.userState.user.userID ? (
                <Navigate to="/tasks" />
              ) : (
                <LandingPage />
              )
            }
          />

          <Route path="/tasks" element={token ? <TaskList /> : <Navigate to = '/' />} />

          <Route path="/employee-directory" element={<EmployeeDirectory />} />

          <Route path="/add-employee" element={<EmployeeForm />} />

          <Route path="/sign-up" element={<SignUpForm />} />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
        </Routes>
        <Footer />
      </div>
    )
  );
}

export default App
