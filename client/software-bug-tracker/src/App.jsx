/* eslint-disable no-unused-vars */
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
import LogOut from './assets/logout.gif';
import AssignTask from './assets/assign-task.gif';
import Directory from './assets/directory.gif';
import UnassignedTask from './assets/unassigned-tasks.gif';
import Networking from './assets/networking.gif';
import AddEmployee from './assets/add-user.gif';
import LogOutButton from './components/LogOutButton/LogOutButton';
import TasksButton from './components/TasksButton/TasksButton';
import EmployeeDirectoryButton from './components/EmployeeDirectoryButton/EmployeeDirectoryButton';
import SaveButton from './components/SaveButton/SaveButton';
import SettingsButton from './components/SettingsButton/SettingsButton';
import React from 'react';
import './App.css'


function ProtectedRoute({ condition, redirectTo, children }) {
  return condition ? children : <Navigate to={redirectTo} />;
}


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
          {token && (
            <>
              <div id="main-profile-pic">
                <img
                  src={
                    loggedInEmployee.avatar ||
                    "/uploads/default-profile-pic.jpg"
                  }
                  alt="profile pic"
                />
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
                {context.hasAdminRights() ? "There Are " : "You Have "}
                <strong className="stand-out">
                  {completed}
                </strong> Completed {completed === 1 ? "Task" : "Tasks"} and{" "}
                <strong className="stand-out">{incomplete}</strong> Incompleted{" "}
                {incomplete === 1 ? "Task" : "Tasks"}.
              </h4>
              <h4 id="unassigned-tasks-info-heading">
                There {taskContext.unassignedTasks.length === 1 ? "Is" : "Are"}{" "}
                Currently{" "}
                <strong className="stand-out">
                  {taskContext.unassignedTasks.length || 0}
                </strong>{" "}
                Unassigned{" "}
                {taskContext.unassignedTasks.length === 1 ? "Task" : "Tasks"} In
                The Queue
              </h4>
            </>
          )}
          {token && (
            <div id="nav-main-container">
              <hr />
              <div id="nav-button-container">
                <LogOutButton logout={context.logout}/>
                <TasksButton navigate={navigate}/>
                {context.employees.length > 0 && context.hasAdminRights() ? (
                  <EmployeeDirectoryButton navigate={navigate}/>
                ) : null}

                <button
                  type="button"
                  id="unassigned-tasks-button"
                  onClick={() => navigate("/unassigned-tasks")}>
                  <img src={UnassignedTask} />
                  Un-Assigned Tasks
                </button>

                <button
                  type="button"
                  id="live-support-button"
                  onClick={() => navigate("/messages")}>
                  <img src={Networking} id="networking-image" />
                  Connect With Other Employees
                </button>

                {context.hasAdminRights() && (
                  <button
                    type="button"
                    id="add-employee-main-button"
                    onClick={() => navigate("/add-employee")}>
                    <img src={AddEmployee} />
                    Add Employee
                  </button>
                )}
              </div>
              <hr />
            </div>
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/tasks" /> : <LandingPage />}
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute condition={!!token} redirectTo="/">
                <LiveSupport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute condition={!!token} redirectTo="/">
                <TaskList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee-directory"
            element={
              <ProtectedRoute
                condition={context.hasAdminRights()}
                redirectTo="/unauthorized">
                <EmployeeDirectory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-employee"
            element={
              <ProtectedRoute
                condition={context.hasAdminRights()}
                redirectTo="/unauthorized">
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-up"
            element={!token ? <SignUpForm /> : <Navigate to="/tasks" />}
          />

          <Route
            path="/unassigned-tasks"
            element={
              <ProtectedRoute condition={!!token} redirectTo="/">
                <UnAssignedTasks />
              </ProtectedRoute>
            }
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
