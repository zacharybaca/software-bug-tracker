import { BrowserRouter as Router } from "react-router-dom";
import { EmployeesContextProvider } from "./employeesContext.jsx";
import { TasksContextProvider } from "./tasksContext.jsx";

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <EmployeesContextProvider>
        <TasksContextProvider>{children}</TasksContextProvider>
      </EmployeesContextProvider>
    </Router>
  );
};
