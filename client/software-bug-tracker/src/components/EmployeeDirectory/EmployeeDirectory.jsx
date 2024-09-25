import './employee-directory.css';
import { EmployeesContext } from '../../context/employeesContext';
import EmployeeBadge from '../EmployeeBadge/EmployeeBadge';
import React from 'react';

const EmployeeDirectory = () => {
  const context = React.useContext(EmployeesContext);


    return (
      <div id="employee-directory-container">
        <h2 id="employee-directory-heading">Employee Directory</h2>
        <ul id="employee-directory-list">
          {context.employees.map((employee, index) => (
            <li key={employee._id} className="employee">
              <EmployeeBadge
                itemNumber={index}
                employeeID={employee._id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                roleAtCompany={employee.roleAtCompany}
                userID={employee.user.userID}
                password={employee.user.password}
                isAdmin={employee.isAdmin}
                accessCode={employee.accessCode}
                updateEmployeeProfile={context.updateEmployeeProfile}
                deleteEmployee={context.deleteEmployee}
                errMsg={context.userState.errMsg}
              />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default EmployeeDirectory;
