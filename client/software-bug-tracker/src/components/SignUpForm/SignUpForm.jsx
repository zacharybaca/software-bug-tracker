import './sign-up-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';



function SignUpForm() {

  const context = React.useContext(EmployeesContext);

    const [user, setUser] = React.useState({
        userID: "",
        password: "",
        accessCode: "",
        associatedEmployee: ""
    });

    function handleChange(e) {
      const { name, value, type, checked } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
    }


     function handleSubmit(e) {
       e.preventDefault();
       context.createLogin(user, user.associatedEmployee._id, user.accessCode);
       setUser({
          userID: "",
          password: "",
          accessCode: ""
       });
     }

    return (
        <>
        <h1 id="sign-up-heading">Sign Up For Account Access</h1>
        <form id="sign-up-form" name="signUpForm" onSubmit={handleSubmit}>
            <label htmlFor="userID">Create A Username: </label>
            <input type="text" id="user-name" name="userID" value={user.userID} onChange={handleChange} placeholder="Username" />
            <label htmlFor="password">Create A Password: </label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            <label htmlFor="associatedEmployee">Select Associated Employee: </label>
            <select id="associated-employee" name="associatedEmployee" value={user.associatedEmployee} onChange={handleChange}>
              <option defaultValue>Select Associated Employee</option>
              {context.employees.map(employee => (
                <option value={employee._id} key={employee._id}>{employee.firstName} {employee.lastName}</option>
              ))}
            </select>
            <label htmlFor="accessCode">Please Enter Access Code To Create An Account: </label>
            <input type="text" id="accessCode" name="accessCode" value={user.accessCode} onChange={handleChange} placeholder="Access Code"/>
            <button type="submit" id="sign-up-form-button">Sign Up!</button>
        </form>
        <button type="button" id="existing-user-button">Already A User? Click Here to Login</button>
        </>
    )
}

export default SignUpForm;
