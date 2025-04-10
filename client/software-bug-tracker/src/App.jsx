import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LandingPage from "./components/LandingPage/LandingPage";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import EmployeeDirectory from "./components/EmployeeDirectory/EmployeeDirectory";
import Footer from "./components/Footer/Footer";
import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage";
import PageDoesNotExist from "./components/PageDoesNotExist/PageDoesNotExist";
import LiveSupport from "./components/LiveSupport/LiveSupport";
import UnAssignedTasks from "./components/UnAssignedTasks/UnAssignedTasks";
import SnackBarNotification from "./components/SnackBarNotification/SnackBarNotification";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ChangeAppBackground from "./components/ChangeAppBackground/ChangeAppBackground";
import ChatBot from "./components/ChatBot/ChatBot";
import { SnackBarNotificationContext } from "./context/snackBarNotificationContext";
import { EmployeesContext } from "./context/employeesContext";
import { TasksContext } from "./context/tasksContext";
import { ConfirmationDialogBoxContext } from "./context/confirmationDialogBoxContext";
import logo from "./assets/issue-insight-logo.png";
import "./App.css";

function ProtectedRoute({ condition, redirectTo, children }) {
  return condition ? children : <Navigate to={redirectTo} />;
}

function App() {
  const context = React.useContext(EmployeesContext);
  const dialogBoxContext = React.useContext(ConfirmationDialogBoxContext);
  const snackBarContext = React.useContext(SnackBarNotificationContext);
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
      }, 6000);
    }
  }, [loader]);

  return (
    !loading && (
        <div id="app-container" className={dialogBoxContext.background ? dialogBoxContext.background : ""}>
          {!loggedInEmployee || !loggedInEmployee.user.userID ? (
            <div className="header-container">
              <ChangeAppBackground />
            </div>
          ): ""}
          {loggedInEmployee ? <div id="drop-down-housing-container">
            <DropDownMenu navigate={navigate} />
          </div> : ""}
          <PasswordReset />
          {snackBarContext.showToast && loggedInEmployee && (
            <SnackBarNotification
              onClose={snackBarContext.handleCloseToast}
              onShow={snackBarContext.handleShowToast}
              show={snackBarContext.showToast}
              connectedUser={snackBarContext.connectedUser}
              disconnectedUser={snackBarContext.disconnectedUser}
            />
          )}
          <div id="application-logo-container">
            <img src={logo} alt="logo" id="logo" />
            {token && loggedInEmployee && (
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
                <div id="user-info">
                  <h2 id="user-welcome-heading">
                    Welcome {`${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`}
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
                    In The Queue.
                  </h4>
                </div>
              </>
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
            path="/reset-password"
            element={!token ? <PasswordReset /> : <Navigate to="/tasks" />}
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
        {/* {loggedInEmployee ? <div id="chatbot">
          <ChatBot />
        </div> : ""} */}
        <ChatBot />
        <Footer />
      </div>
    )
  );
}

export default App;
