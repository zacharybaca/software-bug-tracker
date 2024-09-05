import './employee-form.css';
import React from 'react';


function EmployeeForm(props) {
    

    // State Responsible For Individual Employees
    const initialValues = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      roleAtCompany: props.roleAtCompany || "",
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
        <label htmlFor="employeeFirstName">Employee First Name: </label>
        <input
          type="text"
          id="employee-first-name"
          name="employeeFirstName"
          onChange={handleChange}
          value={employee.firstName}
          placeholder="Enter Employee's First Name"
        />
        <label htmlFor="employeeLastName">Employee Last Name: </label>
        <input
          type="text"
          id="employee-last-name"
          name="employeeLastName"
          onChange={handleChange}
          value={employee.lastName}
          placeholder="Enter Employee's Last Name"
        />
        <label htmlFor="employeeRole">Assign Employee Role: </label>
        <select id="employee-role" name="employeeRole" onChange={handleChange} value={employee.roleAtCompany}>
          <option defaultValue>Select A Role</option>
          <option value="softwareEngineer">Software Engineer I</option>
          <option value="softwareEngineer2">Software Engineer II</option>
          <option value="uxSpecialist">UX Specialist</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" id="add-employee-button">
          {props.buttonText}
        </button>
      </form>
    );
}

export default EmployeeForm;
