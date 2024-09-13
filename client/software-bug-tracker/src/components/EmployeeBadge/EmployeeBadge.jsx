import './employee-badge.css';
import { EmployeesContext } from '../../context/employeesContext';
import React from 'react';

const EmployeeBadge = (props) => {
    const context = React.useContext(EmployeesContext);
    const [showForm, setShowForm] = React.useState(false);

    return (
      <div id="all-badges-container">
        <header
          id="badge-header"
          style={{
            backgroundColor:
              Number(props.itemNumber) % 2 === 0 ? "blue" : "red",
          }}>
          Badge:
        </header>
        <div id="badge-container">
          <div id="badge-name-container">
            <p>
              <span className="label">Name:</span>{" "}
              {`${props.firstName} ${props.lastName}`}
            </p>
          </div>
          <div id="badge-personal-info-container">
            <p>
              <span className="label">Employee ID:</span> {props.employeeID}
            </p>
            <p>
              <span className="label">Position:</span>{" "}
              {props.roleAtCompany.charAt(0).toUpperCase() +
                props.roleAtCompany.slice(1)}
            </p>
          </div>
          <div id="badge-other-info-container">
            <p>
              <span className="label">User ID:</span>{" "}
              {props.userID ? props.userID : "Not Registered For Access"}
            </p>
            <p id="admin-element">
              <span className="label">Admin:</span>{" "}
              {props.isAdmin ? "✅" : "❌"}
            </p>
          </div>
          <div id="access-code-container">
            <p>
              <span className="label">Access Code:</span>{" "}
              {props.accessCode ? props.accessCode : "Access Code Has Not Been Generated"}
            </p>
          </div>
          <div id="badge-button-container">
            <button type="button" id="remove-employee-button" onClick={() => context.deleteEmployee(props.employeeID)}>
              Remove Employee
            </button>
            <button type="button" id="edit-employee-button">
              Edit Employee
            </button>
          </div>
        </div>
      </div>
    );
}

export default EmployeeBadge;
