import './landing-page.css';
import { Link } from 'react-router-dom';


function LandingPage(props) {
    return (
      <div id="landing-page-container">
        <h1 id="form-header">Sign In To Access Your Account</h1>
        <form id="login-form" name="loginForm">
          <label htmlFor="loginUserName">Enter Username: </label>
          <input
            type="text"
            id="login-user-name"
            name="loginUserName"
            placeholder="Enter Username"
          />
          <label htmlFor="loginUserPassword">Enter Password: </label>
          <input
            type="password"
            id="login-user-password"
            name="loginUserPassword"
            placeholder="Enter Password"
          />
          <button type="submit" id="login-button">
            {props.buttonText}
          </button>
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