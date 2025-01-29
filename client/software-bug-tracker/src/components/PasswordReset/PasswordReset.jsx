import React from 'react';
import './password-reset.css';

const PasswordReset = () => {
    return (
        <div id="password-reset-container">
            <h1>Password Reset</h1>
            <form id="password-reset-form">
                <label htmlFor="access-code">Enter Access Code:</label>
                <input type="number" id="access-code" name="access-code" />
                <label htmlFor="new-password">Enter New Password:</label>
                <input type="password" id="new-password" name="new-password" />
                <label htmlFor="confirm-password">Confirm New Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" />
            </form>
        </div>
    )
}

export default PasswordReset;
