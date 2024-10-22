import './sign-up-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import { Link } from 'react-router-dom';



function SignUpForm() {

  const context = React.useContext(EmployeesContext);

    const [employee, setEmployee] = React.useState({
      firstName: "",
      lastName: "",
      roleAtCompany: "",
      user: {
        userID: "",
        password: "",
      },
      generateAccessCode: "",
      accessCode: "",
      isAdmin: "",
    });

    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      
        if (name === "roleAtCompany" && value === "manager") {
          setEmployee((prevState) => ({
            ...prevState,
            isAdmin: true,
          }));
        }
        else if (name === "roleAtCompany") {
          setEmployee((prevState) => ({
            ...prevState,
            isAdmin: false
          }));
        }

        if (name === "userID" || name === "password" || name === "associatedEmployee") {
          setEmployee((prevState) => ({
            ...prevState,
            user: {
              ...prevState.user,
              [name]: type === "checkbox" ? checked : value,
            },
          }));
        } else {
          setEmployee((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
          }));
        }
    }
     
     function removeEmptyFields(obj) {
       const cleanedObj = {};

       Object.keys(obj).forEach((key) => {
         if (typeof obj[key] === "object" && obj[key] !== null) {
           // Recursively clean nested objects (like the 'user' object)
           const cleanedNested = removeEmptyFields(obj[key]);
           if (Object.keys(cleanedNested).length > 0) {
             cleanedObj[key] = cleanedNested;
           }
         } else if (
           obj[key] !== "" &&
           obj[key] !== null &&
           obj[key] !== undefined
         ) {
           // Add non-empty, non-null, and non-undefined values
           cleanedObj[key] = obj[key];
         }
       });

       return cleanedObj;
     }


     function handleSubmit(e) {
       e.preventDefault();
       const cleanedEmployee = removeEmptyFields(employee);
       try {
        context.createLoginAccount(cleanedEmployee, cleanedEmployee.associatedEmployee, cleanedEmployee.accessCode);
       } catch (error) {
        console.error("Error creating login: ", error.message);
       }
      setEmployee({
        firstName: "",
        lastName: "",
        roleAtCompany: "",
        user: {
          userID: "",
          password: "",
          associatedEmployee: ""
        },
        generateAccessCode: false,
        accessCode: "",
        isAdmin: false,
      });
     }

    return (
        <>
        <h1 id="sign-up-heading">Sign Up For Account Access</h1>
        <form id="sign-up-form" name="signUpForm" onSubmit={handleSubmit}>
            <label htmlFor="userID">Create A Username: </label>
            <input type="text" id="userID" name="userID" value={employee.user.userID} onChange={handleChange} aria-required="true" placeholder="Username" />
            <label htmlFor="password">Create A Password: </label>
            <input type="password" id="password" name="password" value={employee.user.password} onChange={handleChange} aria-required="true" placeholder="Password" />
            <label htmlFor="associatedEmployee">Select Associated Employee: </label>
            <select
              id="associatedEmployee"
              name="associatedEmployee"
              value={employee.user.associatedEmployee}
              onChange={handleChange}
              aria-required="true"
            >
              <option value="">Select Associated Employee</option>
              {context.employees.map((employee) => (
                <option value={employee._id} key={employee._id}>
                  {employee.firstName} {employee.lastName} -{" "}
                  {employee.roleAtCompany
                    ? employee.roleAtCompany.charAt(0).toUpperCase() + employee.roleAtCompany.slice(1)
                    : "No Role Assigned"}
                </option>
              ))}
            </select>
            <label htmlFor="accessCode">Please Enter Access Code To Create An Account: </label>
            <input type="text" id="accessCode" name="accessCode" value={employee.accessCode} onChange={handleChange} aria-required="true" placeholder="Access Code"/>
            <button type="submit" id="sign-up-form-button">Sign Up!</button>
        </form>
        <Link to='/'><button type="button" id="existing-user-button">Already A User? Click Here to Login</button></Link>
        </>
    )
}

export default SignUpForm;
