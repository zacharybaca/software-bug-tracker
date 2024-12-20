import "./landing-page.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesContext } from "../../context/employeesContext";

function LandingPage() {
  const context = React.useContext(EmployeesContext);
  const navigate = useNavigate();
  const initialValues = {
    userID: "",
    password: "",
    avatarPic:
      "",
  };

  const [formData, setFormData] = React.useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(formData);
  };

  function updateImageSrc() {
    const screenWidth = window.innerWidth;
    const size = screenWidth <= 768 ? 20 : screenWidth <= 1200 ? 70 : 130;
    setFormData((prevState) => ({
      ...prevState,
      avatarPic: `https://api.dicebear.com/9.x/icons/svg?icon=search&backgroundType=gradientLinear&backgroundColor=eab581&size=${size}&radius=50`,
    }));
  }

  React.useEffect(() => {
    updateImageSrc();
    const handleResize = () => updateImageSrc();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="landing-page-container">
      <h1 id="form-header">Sign On To Access Your Assigned Tasks</h1>
      
      <form id="login-form" name="loginForm" onSubmit={handleSubmit}>
        <div id="landing-page-avatar">
          <img
            id="avatarImage"
            src={formData.avatarPic}
            alt="landing page avatar"
          />
        </div>
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
        <input
          type="password"
          id="login-user-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
        />
        <button className="btn btn-layered-3d btn-layered-3d--green">
          Sign On
        </button>
        {context.userState.errMsg && (
          <p className="error-message">{context.userState.errMsg}</p>
        )}
        <button
          type="button"
          className="btn btn-layered-3d btn-layered-3d--green"
          onClick={() => navigate("/sign-up")}
        >
        New User? Click Here
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
