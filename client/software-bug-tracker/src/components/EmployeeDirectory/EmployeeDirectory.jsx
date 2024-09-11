import './employee-directory.css';
import { EmployeesContext } from '../../context/employeesContext';
import React from 'react';

const EmployeeDirectory = () => {
  const context = React.useContext(EmployeesContext);


    return (
      <div id="employee-directory-container">
        <ul id="employee-directory-list">
          {context.employees.map((employee) => (
            <li key={employee._id} className="employee">
              <h1>First Name: {employee.firstName}</h1>
              <h1>Last Name: {employee.lastName}</h1>
              <h3>
                Position:{" "}
                {employee.roleAtCompany.charAt(0).toUpperCase() +
                  employee.roleAtCompany.slice(1)}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default EmployeeDirectory;