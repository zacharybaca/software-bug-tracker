import './landing-page.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesContext } from '../../context/employeesContext';


function LandingPage() {
  const context = React.useContext(EmployeesContext);
  const navigate = useNavigate();
  const initialValues = {
    userID: "",
    password: "",
    avatarPic:
      "https://api.dicebear.com/9.x/fun-emoji/svg?radius=20&size=130&backgroundColor=c0aede,ffd5dc,ffdfbf&eyes=glasses,shades,closed&mouth=smileTeeth,smileLol,wideSmile"
  };

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
          <div id="landing-page-avatar">
            <img src={formData.avatarPic ? formData.avatarPic : "/uploads/landing-page-avatar.png"} alt="landing page avatar" />
          </div>
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
          <button type="button" id="new-user-button" onClick={() => navigate("/sign-up")}>
            New User? Click Here
          </button>
      </div>
    );
}

export default LandingPage;
