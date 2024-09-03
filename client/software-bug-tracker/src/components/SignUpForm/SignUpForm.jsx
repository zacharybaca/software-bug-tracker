import './sign-up-form.css';


function SignUpForm(props) {
    return (
        <form id="sign-up-form" name="signUpForm">
            <label htmlFor="userName">Create A Username: </label>
            <input type="text" id="user-name" name="userName" placeholder="Username" />
            <label htmlFor="password">Create A Password: </label>
            <input type="password" id="password" name="password" placeholder="Password" />
            <button type="submit" id="sign-up-form-button">{props.buttonText}</button>
        </form>
    )
}

export default SignUpForm;