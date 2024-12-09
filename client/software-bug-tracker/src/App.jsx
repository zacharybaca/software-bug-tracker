/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LandingPage from "./components/LandingPage/LandingPage";
import EmployeeDirectory from "./components/EmployeeDirectory/EmployeeDirectory";
import Footer from "./components/Footer/Footer";
import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage";
import PageDoesNotExist from "./components/PageDoesNotExist/PageDoesNotExist";
import LiveSupport from "./components/LiveSupport/LiveSupport";
import UnAssignedTasks from "./components/UnAssignedTasks/UnAssignedTasks";
import StickyNavBar from "./components/StickyNavBar/StickyNavBar";
import SaveButton from "./components/SaveButton/SaveButton";
import SettingsButton from "./components/SettingsButton/SettingsButton";
import { EmployeesContext } from "./context/employeesContext";
import { TasksContext } from "./context/tasksContext";
import logo from "./assets/issue-insight-logo.png";
import "./App.css";

function ProtectedRoute({ condition, redirectTo, children }) {
  return condition ? children : <Navigate to={redirectTo} />;
}

function App() {
  const context = React.useContext(EmployeesContext);
  const { token } = context.userState;
  const taskContext = React.useContext(TasksContext);
  const { completed, incomplete } = taskContext.getTaskCounts;
  const [loading, setLoading] = React.useState(true);
  const loader = document.getElementById("gear-loader");
  const navigate = useNavigate();
  const loggedInEmployee = context.getLoggedInEmployee();

  React.useEffect(() => {
    if (loader) {
      setTimeout(() => {
        loader.style.display = "none";
        setLoading(false);
      }, 3000);
    }
  }, [loader]);

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
                      loggedInEmployee && loggedInEmployee.avatar
                        ? loggedInEmployee.avatar
                        : "/uploads/default-profile-pic.jpg"
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
                  <strong className="stand-out">{incomplete}</strong> Incomplete{" "}
                  {incomplete === 1 ? "Task" : "Tasks"}.
                </h4>
                <h4 id="unassigned-tasks-info-heading">
                  There{" "}
                  {taskContext.unassignedTasks.length === 1 ? "Is" : "Are"}{" "}
                  Currently{" "}
                  <strong className="stand-out">
                    {taskContext.unassignedTasks.length || 0}
                  </strong>{" "}
                  Unassigned{" "}
                  {taskContext.unassignedTasks.length === 1 ? "Task" : "Tasks"}{" "}
                  In The Queue
                </h4>
              </>
            )}
          </div>
          {token && (
            <>
              <StickyNavBar navigate={navigate} />
            </>
          )}
        
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

export default App;