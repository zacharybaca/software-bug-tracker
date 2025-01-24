import "./employee-directory.css";
import { EmployeesContext } from "../../context/employeesContext";
import { TasksContext } from "../../context/tasksContext";
import { ConfirmationDialogBoxContext } from "../../context/confirmationDialogBoxContext";
import EmployeeBadge from "../EmployeeBadge/EmployeeBadge";
import React from "react";

const EmployeeDirectory = () => {
  const employeesContext = React.useContext(EmployeesContext);
  const tasksContext = React.useContext(TasksContext);
  const confirmationContext = React.useContext(ConfirmationDialogBoxContext);

  return (
    <div id="employee-directory-container">
      <h2 id="employee-directory-heading">Employee Directory</h2>
      <ul id="employee-directory-list">
        {employeesContext?.employees?.map((employee, index) => (
          <li key={index} className="employee">
            <EmployeeBadge
              key={employee._id}
              itemNumber={index}
              employeeID={employee._id}
              firstName={employee.firstName}
              lastName={employee.lastName}
              roleAtCompany={employee.roleAtCompany}
              userID={employee.user?.userID}
              password={employee.user?.password}
              associatedEmployee={employee._id}
              isAdmin={employee.roleAtCompany === "manager"}
              accessCode={employee.accessCode}
              confirmation={confirmationContext.proceed}
              handleQuestion={confirmationContext.handleDialogQuestion}
              avatar={
                employee.avatar
                  ? employee.avatar
                  : "/uploads/default-profile-pic.jpg"
              }
              avatarUrl={
                employee.avatar
                  ? employee.avatar
                  : "/uploads/default-profile-pic.jpg"
              }
              updateEmployeeProfile={employeesContext.updateEmployee}
              deleteEmployee={employeesContext.deleteEmployee}
              unAssignTasksForDeletedEmployee={
                tasksContext?.unAssignTasksForDeletedEmployee
              }
              errMsg={employeesContext.userState?.errMsg}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDirectory;
