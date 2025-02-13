import "./landing-page.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesContext } from "../../context/employeesContext";
import { PasswordResetContext } from "../../context/passwordResetContext";
import CreateAvatar from "../CreateAvatar/CreateAvatar";


function LandingPage() {
  const context = React.useContext(EmployeesContext);
  const passwordResetContext = React.useContext(PasswordResetContext);
  const navigate = useNavigate();
  
  const initialValues = {
    userID: localStorage.getItem("userID") ? localStorage.getItem("userID") : "",
    password: "",
    avatarSize:"",
    initial: "",
    isChecked: false
  };

  const [formData, setFormData] = React.useState(initialValues);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.isChecked) {
      localStorage.setItem("userID", formData.userID);
    }
    else {
      localStorage.removeItem("userID");
    }

    context.login(formData).finally(() => setIsLoading(false));
  };

  function updateImageSrc() {
    const screenWidth = window.innerWidth;
    const size = screenWidth <= 768 ? 20 : screenWidth <= 1200 ? 70 : 130;
    setFormData((prevState) => ({
      ...prevState,
      avatarSize: size,
    }));
  }

  React.useEffect(() => {
    updateImageSrc();
    const handleResize = () => updateImageSrc();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const savedUserID = localStorage.getItem("userID");

    if (savedUserID) {
      setFormData((prevState) => ({
        ...prevState,
        userID: savedUserID,
        isChecked: true
      }));
    }
  }, []);

  React.useEffect(() => {
    if (context.userState.token) {
      navigate("/tasks");
    }
  }, [context.userState.token, navigate]);
  
  return (
    <div id="landing-page-container">
      <h1 id="form-header">Sign On To Access Your Assigned Tasks</h1>

      <form id="login-form" name="loginForm" onSubmit={handleSubmit}>
        <div id="landing-page-avatar">
          <CreateAvatar size={formData.avatarSize}/>
        </div>
        <div id="username-container">
          <label htmlFor="login-user-name">Please Enter Your Username: </label>
          <input
          type="text"
          id="login-user-name"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          required
          autoFocus
          placeholder="Enter Username"
          />
        </div>
        <div id="password-container">
          <label htmlFor="login-user-password">Please Enter Your Password: </label>
          <input
          type="password"
          id="login-user-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
          />
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="remember-me"
            name="isChecked"
            checked={formData.isChecked}
            onChange={handleChange}
          />
          <label htmlFor="remember-me" className="label-for-checkbox">
            Remember Me?
          </label>
        </div>
        <button
          type="button"
          className="btn btn-layered-3d btn-layered-3d--green glow-on-enter"
          id="reset-password-button"
          onClick={() => {
          passwordResetContext.handleShowPasswordResetForm();
          navigate("/reset-password")}}
        >
          Forgot Password?
        </button>
        <button className="btn btn-layered-3d btn-layered-3d--green glow-on-enter" id="sign-on-button" disabled={isLoading}>
          {isLoading ? "Signing On..." : "Sign On"}
        </button>
        {context.userState.errMsg && (
          <p className="error-message">{context.userState.errMsg}</p>
        )}
        <button
          type="button"
          className="btn btn-layered-3d btn-layered-3d--green glow-on-enter"
          id="new-user-button"
          onClick={() => navigate("/sign-up")}
        >
        New User? Click Here
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
