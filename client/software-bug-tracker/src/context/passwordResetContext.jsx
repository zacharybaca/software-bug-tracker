/* eslint-disable no-unused-vars */
import React, { useState, useContext, createContext } from "react";
import { EmployeesContext } from "./employeesContext";

const PasswordResetContext = createContext();

function PasswordResetContextProvider({ children }) {
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [formData, setFormData] = useState({
        userID: "",
        accessCode: "",
        newPassword: "",
        confirmPassword: ""
    });

    const employeesContext = useContext(EmployeesContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleShowPasswordResetForm = () => setShowPasswordResetForm(true);
    const handleClosePasswordResetForm = () => setShowPasswordResetForm(false);

    const updateEmployeePassword = async (userID, accessCode, newPassword, confirmPassword, employeeID) => {
        try {
            const updatedInfo = { userID, accessCode, newPassword, confirmPassword };

            const response = await fetch(`/api/employees/${employeeID}/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInfo),
            });

            if (!response.ok) throw new Error(`Failed to update password: ${response.statusText}`);

            const updatedEmployee = await response.json();

            employeesContext.setEmployees(prevEmployees =>
                prevEmployees.map(employee => (employee._id !== employeeID ? employee : updatedEmployee))
            );

        } catch (error) {
            employeesContext.handleAuthErr(error.message);
        }
    };

    return (
        <PasswordResetContext.Provider
            value={{
                showPasswordResetForm,
                formData,
                handleChange,
                handleShowPasswordResetForm,
                handleClosePasswordResetForm,
                updateEmployeePassword
            }}
        >
            {children}
        </PasswordResetContext.Provider>
    );
}

export { PasswordResetContext, PasswordResetContextProvider };
