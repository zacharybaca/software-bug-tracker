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
            <SnackBarNotificationContextProvider>
              <EmployeesContextProvider>
                <PasswordResetContextProvider>
                  <TasksContextProvider>{children}</TasksContextProvider>
                </PasswordResetContextProvider>
              </EmployeesContextProvider>
            </SnackBarNotificationContextProvider>
        </ConfirmationDialogBoxContextProvider>
      </ChatBotContextProvider>
    </Router>
  );
};
