import './employee-form.css';


function EmployeeForm(props) {
    return (
      <form id="employee-form" name="employeeForm">
        <label htmlFor="employeeFirstName">Employee First Name: </label>
        <input
          type="text"
          id="employee-first-name"
          name="employeeFirstName"
          placeholder="Enter Employee's First Name"
        />
        <label htmlFor="employeeLastName">Employee Last Name: </label>
        <input
          type="text"
          id="employee-last-name"
          name="employeeLastName"
          placeholder="Enter Employee's Last Name"
        />
        <label htmlFor="employeeRole">Assign Employee Role: </label>
        <select id="employee-role" name="employeeRole">
          <option defaultValue>Select A Role</option>
          <option value="softwareEngineer">Software Engineer</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" id="add-employee-button">
          {props.buttonText}
        </button>
      </form>
    );
}

export default EmployeeForm;
