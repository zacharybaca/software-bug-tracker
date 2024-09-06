import './sign-up-form.css';
import React from 'react';


function SignUpForm(props) {
    

    const initialValues = {
      _id: props._id || "",
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      roleAtCompany: props.roleAtCompany || "",
      user: {
        userID: props.user.userID || "",
        password: props.user.password || "",
      }
    };

    const [employee, setEmployee] = React.useState(initialValues);

     function handleChange(e) {
       const { name, value, type, checked } = e.target;

       setEmployee((prevState) => ({
         ...prevState,
         [name]: type === "checkbox" ? checked : value,
       }));
     }

     function handleSubmit(e) {
       e.preventDefault();
       props.submitEmployee(employee, employee._id);
       setEmployee(initialValues);
       if (props.toggleForm) {
         props.toggleForm((prevState) => !prevState);
       }
     }

    return (
        <>
        <h1 id="sign-up-heading">Sign Up For Account Access</h1>
        <form id="sign-up-form" name="signUpForm" onSubmit={handleSubmit}>
            <label htmlFor="userID">Create A Username: </label>
            <input type="text" id="user-name" name="userID" value={employee.user.userID} onChange={handleChange} placeholder="Username" />
            <label htmlFor="password">Create A Password: </label>
            <input type="password" id="password" name="password" value={employee.user.password} onChange={handleChange} placeholder="Password" />
            
            <button type="submit" id="sign-up-form-button">{props.buttonText}</button>
        </form>
        <button type="button" id="existing-user-button">Already A User? Click Here to Login</button>
        </>
    )
}

export default SignUpForm;