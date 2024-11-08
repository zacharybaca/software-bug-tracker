import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LandingPage from './components/LandingPage/LandingPage';
import EmployeeDirectory from './components/EmployeeDirectory/EmployeeDirectory';
import Footer from './components/Footer/Footer';
import UnauthorizedPage from './components/UnauthorizedPage/UnauthorizedPage';
import PageDoesNotExist from './components/PageDoesNotExist/PageDoesNotExist';
import LiveSupport from './components/LiveSupport/LiveSupport';
import UnAssignedTasks from './components/UnAssignedTasks/UnAssignedTasks';
import { EmployeesContext } from './context/employeesContext';
import { TasksContext } from './context/tasksContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const loggedInEmployee = context.getLoggedInEmployee();

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
          {Object.keys(context.userState.user).length !== 0 && token ? (
            <>
              <div id="main-profile-pic">
                <img src={loggedInEmployee.avatar || "/uploads/default-profile-pic.jpg"} alt="profile pic" />
              </div>
              <h2 id="user-welcome-heading">
                Welcome {context.findName(context.userState.user.userID)}
              </h2>
              <h2 id="position-at-company-heading">
                We Are Glad to Have You As a{" "}
                {context
                  .findRoleAtCompany(context.userState.user.userID)
                  .charAt(0)
                  .toUpperCase() +
                  context
                    .findRoleAtCompany(context.userState.user.userID)
                    .slice(1)}
                !
              </h2>
              <h4 id="info-heading">
                {context.hasAdminRights() ? "There Are " : "You Have "}{completed} Completed{" "}
                {completed === 1 ? "Task" : "Tasks"} and {incomplete}{" "}
                Incompleted {incomplete === 1 ? "Task" : "Tasks"}.
              </h4>
              <h4 id="unassigned-tasks-info-heading">
                There {taskContext.unassignedTasks.length === 1 ? "Is" : "Are"} Currently {taskContext.unassignedTasks.length || 0} Unassigned {taskContext.unassignedTasks.length === 1 ? "Task" : "Tasks"} In The Queue
              </h4>
            </>
          ) : (
            ""
          )}
          {Object.keys(context.userState.user).length !== 0 && token ? (
            <div id="nav-main-container">
              <hr />
              <div id="nav-button-container">
                <button type="button" id="logout-button" onClick={context.logout}>
                  Logout
                </button>
                <button
                  type="button"
                  id="my-tasks-button"
                  onClick={() => navigate("/tasks")}>
                  {context.hasAdminRights() ? "Employee Tasks" : "My Tasks"}
                </button>
                {context.employees.length > 0 && context.hasAdminRights() ? (
                  <button
                    type="button"
                    id="employee-directory-button"
                    onClick={() => navigate("/employee-directory")}>
                    Employee Directory
                  </button>
                ) : null}

                <button type="button" id="unassigned-tasks-button" onClick={() => navigate("/unassigned-tasks")}>
                  Un-Assigned Tasks
                </button>

                <button type="button" id="live-support-button" onClick={() => navigate("/messages")}>Connect With Other Employees</button>
                
                {context.hasAdminRights() && (
                      <button type="button" id="add-employee-main-button" onClick={() => navigate("/add-employee")}>
                        Add Employee
                      </button>
                )}
              </div>
                <hr />
            </div>
          ) : (
            ""
          )}
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={
              context.userState.user.userID && token ? (
                <Navigate to="/tasks" />
              ) : (
                <LandingPage />
              )
            }
          />

          <Route
            path="/messages"
            element={token ? <LiveSupport /> : <Navigate to="/" />}
          />
          
          <Route
            path="/tasks"
            element={token ? <TaskList /> : <Navigate to="/" />}
          />

          <Route
            path="/employee-directory"
            element={
              context.hasAdminRights() ? (
                <EmployeeDirectory />
              ) : (
                <UnauthorizedPage />
              )
            }
          />

          <Route
            path="/add-employee"
            element={
              context.hasAdminRights() ? <EmployeeForm /> : <UnauthorizedPage />
            }
          />

          <Route path="/sign-up" element={!context.userState.user.userID && !token ? <SignUpForm /> : <TaskList />} />

          <Route path="/unassigned-tasks" element={token ?<UnAssignedTasks /> : <Navigate to="/" />}
          />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route path="*" element={<PageDoesNotExist />} />
        </Routes>
        <Footer />
      </div>
    )
  );
}

export default App
