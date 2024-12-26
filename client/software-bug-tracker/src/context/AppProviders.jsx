import { BrowserRouter as Router } from "react-router-dom";
import { EmployeesContextProvider } from "./employeesContext.jsx";
import { TasksContextProvider } from "./tasksContext.jsx";
import { SnackBarNotificationContextProvider } from "./snackBarNotificationContext.jsx";

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <SnackBarNotificationContextProvider>
        <EmployeesContextProvider>
          <TasksContextProvider>{children}</TasksContextProvider>
        </EmployeesContextProvider>
      </SnackBarNotificationContextProvider>
    </Router>
  );
};
