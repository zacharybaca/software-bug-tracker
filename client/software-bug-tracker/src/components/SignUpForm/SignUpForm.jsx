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
      avatar: "",
      generateAccessCode: "",
      accessCode: "",
      isAdmin: "",
    });

    function handleChange(e) {
      const { name, value, type, checked, files } = e.target;
    
      if (type === "file" && files.length > 0) {
        setEmployee((prevState) => ({
          ...prevState,
          [name]: files[0], // Store the file object directly
        }));
      } else if (name === "roleAtCompany" && value === "manager") {
        setEmployee((prevState) => ({
          ...prevState,
          isAdmin: true,
        }));
      } else if (name === "roleAtCompany") {
        setEmployee((prevState) => ({
          ...prevState,
          isAdmin: false,
        }));
      } else if (name === "userID" || name === "password") {
        setEmployee((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            [name]: value,
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
        avatar: "",
        generateAccessCode: false,
        accessCode: "",
        isAdmin: false,
      });
     }

    return (
      <div id="sign-up-form-container">
        <h1 id="sign-up-heading">Sign Up For Account Access</h1>
        <form id="sign-up-form" name="signUpForm" onSubmit={handleSubmit}>
          <label htmlFor="userID">Create A Username: </label>
          <input
            type="text"
            id="userID"
            name="userID"
            value={employee.user.userID}
            onChange={handleChange}
            aria-required="true"
            placeholder="Username"
          />
          <label htmlFor="password">Create A Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.user.password}
            onChange={handleChange}
            aria-required="true"
            placeholder="Password"
          />
          <label htmlFor="associatedEmployee">
            Select Associated Employee:{" "}
          </label>
          <select
            id="associatedEmployee"
            name="associatedEmployee"
            value={employee.user.associatedEmployee}
            onChange={handleChange}
            aria-required="true">
            <option value="">Select Associated Employee</option>
            {context.employees.map((employee) => (
              <option value={employee._id} key={employee._id}>
                {employee.firstName} {employee.lastName} -{" "}
                {employee.roleAtCompany
                  ? employee.roleAtCompany.charAt(0).toUpperCase() +
                    employee.roleAtCompany.slice(1)
                  : "No Role Assigned"}
              </option>
            ))}
          </select>
          <label htmlFor="accessCode">
            Please Enter Access Code To Create An Account:{" "}
          </label>
          <input
            type="text"
            id="accessCode"
            name="accessCode"
            value={employee.accessCode}
            onChange={handleChange}
            aria-required="true"
            placeholder="Access Code"
          />
          <label htmlFor="avatar">Upload A Profile Image</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleChange}
            accept="image/*"
          />
          <button
            type="submit"
            className="btn btn-layered-3d btn-layered-3d--green">
            Sign Up!
          </button>
          <Link to="/">
            <button
              type="button"
              className="btn btn-layered-3d btn-layered-3d--green"
              id="existing-user-button">
              Existing User? Click Here!
            </button>
          </Link>
        </form>
      </div>
    );
}

export default SignUpForm;
