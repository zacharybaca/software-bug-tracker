import './employee-badge.css';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import React from 'react';

const EmployeeBadge = (props) => {
    const [showForm, setShowForm] = React.useState(false);

    return (
      <>
        {!showForm ? (
          <>
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
                    <span className="label">Employee ID:</span>{" "}
                    {props.employeeID}
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
                    {props.accessCode
                      ? props.accessCode
                      : "Access Code Has Not Been Generated"}
                  </p>
                </div>
                <div id="badge-button-container">
                  <button
                    type="button"
                    id="remove-employee-button"
                    onClick={() => props.deleteEmployee(props.employeeID)}>
                    Remove Employee
                  </button>
                  <button type="button" id="edit-employee-button" onClick={() => setShowForm((prevState) => !prevState)}>
                    Edit Employee
                  </button>
                </div>
                {props.errMsg ? <p style={{color: "red"}}>{props.errMsg}</p> : ""}
              </div>
            </div>
          </>
        ) : (
            <>
              <EmployeeForm
                itemNumber={props.itemNumber}
                employeeID={props.employeeID}
                firstName={props.firstName}
                lastName={props.lastName}
                roleAtCompany={props.roleAtCompany}
                userID={props.userID}
                password={props.password}
                isAdmin={props.isAdmin}
                accessCode={props.accessCode}
                toggleForm={setShowForm}
                submitEmployee={props.updateEmployeeProfile}
                bttnText="Update"
              />
              <button
                type="button"
                onClick={() => setShowForm((prevState) => !prevState)}>
                Close
              </button>
            </>
        )}
      </>
    );
}

export default EmployeeBadge;
