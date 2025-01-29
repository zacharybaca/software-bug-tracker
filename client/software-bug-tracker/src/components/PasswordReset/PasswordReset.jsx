import React from 'react';
import './password-reset.css';

const PasswordReset = () => {
    const [showPasswordForm, setShowPasswordForm] = React.useState(true);

    const toggleShowPassword = () => {
        setShowPasswordForm(!showPasswordForm);
    };
    
    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <div id="password-reset-container">
                    <h1>Password Reset</h1>
                    <form id="password-reset-form">
                        <label htmlFor="access-code">Enter Access Code:</label>
                            <input 
                                type="number" 
                                id="access-code" 
                                name="access-code"
                                placeholder="Enter Access Code" 
                            />
                        <label htmlFor="new-password">Enter New Password:</label>
                            <input 
                                type="password" 
                                id="new-password" 
                                name="new-password"
                                placeholder="Enter New Password" 
                            />
                        <label htmlFor="confirm-password">Confirm New Password:</label>
                            <input 
                                type="password" 
                                id="confirm-password" 
                                name="confirm-password"
                                placeholder="Confirm New Password" 
                            />
                        <button type="submit" className="glow-on-hover">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;
