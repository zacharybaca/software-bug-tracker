import './landing-page.css';


function LandingPage() {
    return (
        <div id="landing-page-container">
            <form id="login-form" name="loginForm">
                <label htmlFor="loginUserName">Enter Username: </label>
                <input type="text" id="login-user-name" name="loginUserName" placeholder="Enter Username" />
                <label htmlFor="loginUserPassword">Enter Password: </label>
                <input type="password" id="login-user-password" name="loginUserPassword" placeholder="Enter Password" />
                <button type="submit" id="login-button">Login</button>
            </form>
            <button type="button" id="new-user-button">New User? Click Here</button>
        </div>
    )
}

export default LandingPage;