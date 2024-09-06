import './employee-form.css';
import React from 'react';


function EmployeeForm(props) {
    

    // State Responsible For Individual Employees
    const initialValues = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      roleAtCompany: props.roleAtCompany || "",
      user: {
        userID: props.user ? props.user.userID : "",
        password: props.user && props.user.userID ? props.user.password : ""
      },
      generateAccessCode: props.generateAccessCode || false,
      accessCode: props.accessCode || "",
      isAdmin: props.roleAtCompany === "manager"
  };

    const [employee, setEmployee] = React.useState(initialValues);

    function handleChange(e) {
      const {name, value, type, checked} = e.target;

      setEmployee(prevState => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value
      }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submitEmployee(employee, employee._id);
    setEmployee(initialValues);
    if (props.toggleForm) {
        props.toggleForm(prevState => !prevState);
    }
  }
    return (
      <form id="employee-form" name="employeeForm" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Employee First Name: </label>
        <input
          type="text"
          id="employee-first-name"
          name="firstName"
          onChange={handleChange}
          value={employee.firstName}
          placeholder="Enter Employee's First Name"
        />
        <label htmlFor="lastName">Employee Last Name: </label>
        <input
          type="text"
          id="employee-last-name"
          name="lastName"
          onChange={handleChange}
          value={employee.lastName}
          placeholder="Enter Employee's Last Name"
        />
        <label htmlFor="roleAtCompany">Assign Employee Role: </label>
        <select id="employee-role" name="roleAtCompany" onChange={handleChange} value={employee.roleAtCompany}>
          <option defaultValue>Select A Role</option>
          <option value="softwareEngineer">Software Engineer I</option>
          <option value="softwareEngineer2">Software Engineer II</option>
          <option value="uxSpecialist">UX Specialist</option>
          <option value="manager">Manager</option>
        </select>
        <label htmlFor="generateAccessCode">Generate Access Code?</label>
        <input type="checkbox" id="generateAccessCode" name="generateAccessCode" checked={employee.generateAccessCode} value={employee.generateAccessCode.checked} onChange={handleChange} />
        {employee.accessCode && <span>`Access Code: <p id="access-code">${employee.accessCode}</p>`</span>}
        <button type="submit" id="add-employee-button">
          {props.buttonText}
        </button>
      </form>
    );
}

export default EmployeeForm;
