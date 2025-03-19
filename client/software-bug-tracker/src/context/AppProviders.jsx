import { BrowserRouter as Router } from "react-router-dom";
import { EmployeesContextProvider } from "./employeesContext.jsx";
import { TasksContextProvider } from "./tasksContext.jsx";
import { SnackBarNotificationContextProvider } from "./snackBarNotificationContext.jsx";
import { ConfirmationDialogBoxContextProvider } from "./confirmationDialogBoxContext";
import { PasswordResetContextProvider } from "./passwordResetContext.jsx";
import { ChatBotContextProvider } from "./chatBotContext.jsx";

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <ChatBotContextProvider>
        <ConfirmationDialogBoxContextProvider>
          <PasswordResetContextProvider>
            <SnackBarNotificationContextProvider>
              <EmployeesContextProvider>
                <TasksContextProvider>{children}</TasksContextProvider>
              </EmployeesContextProvider>
            </SnackBarNotificationContextProvider>
          </PasswordResetContextProvider>
        </ConfirmationDialogBoxContextProvider>
      </ChatBotContextProvider>
    </Router>
  );
};
