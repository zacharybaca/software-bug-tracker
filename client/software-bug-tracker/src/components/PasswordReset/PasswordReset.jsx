import React from "react";
import { useNavigate } from "react-router-dom";
import "./password-reset.css";
import { PasswordResetContext } from "../../context/passwordResetContext";
import { EmployeesContext } from "../../context/employeesContext";

const PasswordReset = () => {
    const context = React.useContext(PasswordResetContext);
    const employeesContext = React.useContext(EmployeesContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userID, accessCode, newPassword, confirmPassword } = context.formData;
        const employee = employeesContext.employees.find(emp => emp.user.userID === userID);

        if (!employee) {
            employeesContext.handleAuthErr({ message: "User not found!", type: "userID" });
            return;
        }

        context.updateEmployeePassword(userID, accessCode, newPassword, confirmPassword);
    };

    return (
        context.showPasswordResetForm && (
            <div className="dialog-overlay">
                <div className="dialog-content">
                    <div id="password-reset-container">
                        <div id="password-reset-header">
                            <h1>Password Reset</h1>
                        </div>
                        <hr />
                        <form id="password-reset-form" onSubmit={handleSubmit}>
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
                            <button type="submit" className="glow-on-hover">
                                Change Password
                            </button>
                            <button
                                type="button"
                                className="glow-on-hover"
                                onClick={() => {
                                    context.handleClosePasswordResetForm();
                                    setTimeout(() => navigate("/"), 100);
                                }}
                            >
                                Close
                            </button>
                        </form>
                        {employeesContext.userState.errMsg && (
                            <p className={`error-message ${employeesContext.userState.errorType}`}>
                                {employeesContext.userState.errMsg}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default PasswordReset;
