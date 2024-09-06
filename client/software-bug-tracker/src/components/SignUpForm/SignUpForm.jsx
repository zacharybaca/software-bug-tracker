import './sign-up-form.css';
import React from 'react';



function SignUpForm() {

    const [user, setUser] = React.useState({
      user: {
        userID: "",
        password: "",
        accessCode: ""
      }
    });

    function handleChange(e) {
      const { name, value, type, checked } = e.target;

      if (name === "userID" || name === "password") {
        setUser((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            [name]: type === "checkbox" ? checked : value,
          },
        }));
      } else {
        setUser((prevState) => ({
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
    }


     function handleSubmit(e) {
       e.preventDefault();
       props.submitEmployee(employee, employee._id);
       setUser({
        user: {
          userID: "",
          password: "",
          accessCode: ""
        }
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
            <label htmlFor="accessCode">Please Enter Access Code To Create An Account: </label>
            <input type="text" id="accessCode" name="accessCode" value={user.accessCode} onChange={handleChange}/>
            <button type="submit" id="sign-up-form-button">Sign Up!</button>
        </form>
        <button type="button" id="existing-user-button">Already A User? Click Here to Login</button>
        </>
    )
}

export default SignUpForm;
