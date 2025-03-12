import "./landing-page.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesContext } from "../../context/employeesContext";
import { PasswordResetContext } from "../../context/passwordResetContext";
import DefaultImage from "../../assets/custom-backgrounds/issue-insight-background.png";
import CreateAvatar from "../CreateAvatar/CreateAvatar";
import ErrorModal from "../ErrorModal/ErrorModal";

const getInitialValues = () => ({
  userID: localStorage.getItem("userID") || "",
  password: "",
  avatarSize: "",
  background: localStorage.getItem("background") ? localStorage.getItem("background") : DefaultImage,
  isChecked: !!localStorage.getItem("userID")
});

function LandingPage() {
  const initialValues = getInitialValues();
  const context = React.useContext(EmployeesContext);
  const passwordResetContext = React.useContext(PasswordResetContext);
  const navigate = useNavigate();
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
    if (context.userState.token) return;
    setIsLoading(true);

    if (localStorage.getItem("userID")) {
      setFormData((prevState) => ({
        ...prevState,
        userID: localStorage.getItem("userID")
      }))
    }
    else if (formData.isChecked && formData.userID && !localStorage.getItem("userID")) {
      localStorage.setItem("userID", formData.userID);
    }
    else if (!formData.isChecked) {
      localStorage.removeItem("userID");
      setFormData((prevState) => ({
        ...prevState,
        userID: ""
      }))
    }

    if (formData.background) {
      localStorage.setItem("background", formData.background);
    }
    else {
      localStorage.removeItem("background");
    }

    context.login(formData).finally(() => setIsLoading(false));
  };

  const updateImageSrc = React.useCallback(() => {
    const screenWidth = window.innerWidth;
    const size = screenWidth <= 768 ? 20 : screenWidth <= 1200 ? 70 : 130;
    setFormData((prevState) => ({ ...prevState, avatarSize: size }));
  }, []);

  React.useEffect(() => {
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
    return () => window.removeEventListener("resize", updateImageSrc);
  }, [updateImageSrc]);

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
      {context.userState.errMsg ? <ErrorModal errorStatement={context.userState.errMsg} /> : ""}
      <div id="application-intro-heading-container">
        <h1 id="application-title-heading">Issue Insight</h1>
        <h1 id="form-header">Navigating Issues, Uncovering Insights</h1>
      </div>
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
        <button type="submit" className="btn btn-layered-3d btn-layered-3d--green glow-on-enter" id="sign-on-button" disabled={isLoading}>
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
