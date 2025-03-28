export const AppProviders = ({ children }) => {
  return (
    <Router>
      <ChatBotContextProvider>
        <ConfirmationDialogBoxContextProvider>
          <SnackBarNotificationContextProvider>
            <EmployeesContextProvider>
              <PasswordResetContextProvider>
                <TasksContextProvider>
                  {children}
                </TasksContextProvider>
              </PasswordResetContextProvider>
            </EmployeesContextProvider>
          </SnackBarNotificationContextProvider>
        </ConfirmationDialogBoxContextProvider>
      </ChatBotContextProvider>
    </Router>
  );
};
