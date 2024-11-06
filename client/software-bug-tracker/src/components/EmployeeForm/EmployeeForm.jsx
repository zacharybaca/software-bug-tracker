import './employee-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';


function EmployeeForm(props) {
  const context = React.useContext(EmployeesContext);

  const initialValues = {
    firstName: props.firstName || "",
    lastName: props.lastName || "",
    roleAtCompany: props.roleAtCompany || "",
    user: {
      userID: props.userID || "",
      password: props.password || "",
    },
    avatar: props.avatar || "",
    generateAccessCode: false,
    accessCode: props.accessCode || "",
    isAdmin: props.roleAtCompany === "manager",
  };

  const [employee, setEmployee] = React.useState(initialValues);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/employees/upload/${props.employeeID}`
        );
        // Handle the response data here if necessary
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [props.employeeID]); // Add props.employeeID to the dependency array

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // If the role is "manager", set the employee as an admin
    if (name === "roleAtCompany" && value === "manager") {
      setEmployee((prevState) => ({
        ...prevState,
        roleAtCompany: value,
        isAdmin: true,
      }));
    }
    // Check if name belongs to the user object (like userID or password)
    else if (name === "userID" || name === "password") {
      setEmployee((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value, // Update the user field (userID or password)
        },
      }));
    }
    // Handle other input fields
    else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submitEmployee
      ? props.submitEmployee(employee, props.employeeID)
      : context.addEmployee(employee);
    setEmployee(initialValues);

    if (props.toggleForm) {
      props.toggleForm((prevState) => !prevState);
    }
  }
  return (
    <form id="employee-form" name="employeeForm" onSubmit={handleSubmit}>
      <label htmlFor="employee-first-name">Employee First Name: </label>
      <input
        type="text"
        id="employee-first-name"
        name="firstName"
        onChange={handleChange}
        value={employee.firstName}
        required
        placeholder="Enter Employee's First Name"
      />
      <label htmlFor="employee-last-name">Employee Last Name: </label>
      <input
        type="text"
        id="employee-last-name"
        name="lastName"
        onChange={handleChange}
        value={employee.lastName}
        required
        placeholder="Enter Employee's Last Name"
      />
      {employee.accessCode ? (
        <>
          <label htmlFor="employee-userid">Employee UserID: </label>
          <input
            type="text"
            id="employee-userid"
            name="userID"
            onChange={handleChange}
            value={employee.user.userID}
          />
          <label htmlFor="employee-password">Employee Password: </label>
          <input
            type="password"
            id="employee-password"
            name="password"
            onChange={handleChange}
            value={employee.user.password}
          />
        </>
      ) : (
        ""
      )}
      <label htmlFor="employee-role">Assign Employee Role: </label>
      <select
        id="employee-role"
        name="roleAtCompany"
        onChange={handleChange}
        value={employee.roleAtCompany}
        required>
        <option defaultValue>Select A Role</option>
        <option value="softwareEngineer">Software Engineer I</option>
        <option value="softwareEngineer2">Software Engineer II</option>
        <option value="uxSpecialist">UX Specialist</option>
        <option value="manager">Manager</option>
      </select>
      <span id="admin-label">
        Does Employee Have Admin Rights?{" "}
        {employee.roleAtCompany === "manager" ? "✅" : "❌"}
      </span>
      <label htmlFor="generateAccessCode">Generate Access Code?</label>
      <input
        type="checkbox"
        id="generateAccessCode"
        name="generateAccessCode"
        checked={employee.generateAccessCode}
        value={employee.generateAccessCode.checked}
        onChange={handleChange}
      />
      <div id="access-code-container">
        {context.userState.accessCode ? (
          <p>Access Code: {context.userState.accessCode}</p>
        ) : (
          ""
        )}
      </div>
      {employee.user.userID ? (
        <div id="avatar-or-upload-container">
          {employee.avatar ? (
            <div id="avatar-pic">
              <h1>Avatar Placeholder</h1>
            </div>
          ) : (
            <div id="upload-container">
              <label htmlFor="avatar">Upload A Profile Image</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                value={employee.avatar}
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          )}
        </div>
      ) : null}
      <button type="submit" id="add-employee-button">
        {props.bttnText || "Add Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;