import React from 'react';
import { useNavigate } from 'react-router-dom';
import './password-reset.css';
import { PasswordResetContext } from '../../context/passwordResetContext';

const PasswordReset = () => {
    const context = React.useContext(PasswordResetContext);
    const navigate = useNavigate();






    return (
        context.showPasswordResetForm && (
            <div className="dialog-overlay">
                <div className="dialog-content">
                    <div id="password-reset-container">
                        <div id="password-reset-header">
                            <h1>Password Reset</h1>
                        </div>
                        <br />
                        <br />
                        <hr />
                        <form id="password-reset-form">
                            <label htmlFor="userID">Enter Your UserID:</label>
                            <input
                                type="text"
                                id="userID"
                                name="userID"
                                value={context.formData.userID}
                                onChange={context.handleChange}
                                placeholder="Enter Your UserID"
                            />
                            <label htmlFor="accessCode">Enter Access Code:</label>
                            <input
                                type="number"
                                id="accessCode"
                                name="accessCode"
                                value={context.formData.accessCode}
                                onChange={context.handleChange}
                                placeholder="Enter Access Code"
                            />
                            <label htmlFor="newPassword">Enter New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={context.formData.newPassword}
                                onChange={context.handleChange}
                                placeholder="Enter New Password"
                            />
                            <label htmlFor="confirmPassword">Confirm New Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={context.formData.confirmPassword}
                                onChange={context.handleChange}
                                placeholder="Confirm New Password"
                            />
                            <button
                                type="submit"
                                className="glow-on-hover"
                                value="change password"
                                onClick={context.handleShowPasswordResetForm}
                            >
                                Change Password
                            </button>
                            <button
                                type="button"
                                className="glow-on-hover"
                                value="close"
                                onClick={() =>
                                    {context.handleClosePasswordResetForm()
                                    navigate("/")
                                }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default PasswordReset;
