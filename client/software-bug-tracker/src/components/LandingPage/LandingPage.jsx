import './landing-page.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';


function LandingPage() {

  const context = React.useContext(EmployeesContext);

  const initialValues = {
    userID: "",
    password: ""
  }

  const [formData, setFormData] = React.useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(formData);
  }

    return (
      <div id="landing-page-container">
        <h1 id="form-header">Sign In To Access Your Account</h1>
        <form id="login-form" name="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="login-user-name"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            required
            placeholder="Enter Username"
          />
          <input
            type="password"
            id="login-user-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
          <button className="btn btn-layered-3d btn-layered-3d--green">Sign In</button>
          {context.userState.errMsg ? <p className="error-message">{context.userState.errMsg}</p> : ""}
        </form>
        <Link to="/sign-up">
          <button type="button" id="new-user-button">
            New User? Click Here
          </button>
        </Link>
      </div>
    );
}

export default LandingPage;
