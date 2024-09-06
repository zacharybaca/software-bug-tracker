import './employee-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';



function EmployeeForm() {
  const context = React.useContext(EmployeesContext);

  const [employee, setEmployee] = React.useState({
    firstName: "",
    lastName: "",
    roleAtCompany: "",
    user: {
      userID: "",
      password: ""
    },
    generateAccessCode: false,
    accessCode: "",
    isAdmin: false
});

   

    

    function handleChange(e) {
      const {name, value, type, checked} = e.target;

      setEmployee(prevState => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value
      }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    context.addEmployee(employee, employee._id);
    setEmployee({
      firstName: "",
      lastName: "",
      roleAtCompany: "",
      user: {
        userID: "",
        password: ""
      },
      generateAccessCode: false,
      accessCode: "",
      isAdmin: false
  });
   
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
          Add Employee
        </button>
      </form>
    );
}

export default EmployeeForm;
