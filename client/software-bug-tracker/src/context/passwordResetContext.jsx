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
            const employee = employeesContext.employees.find(emp => emp._id === employeeID);
            if (!employee) throw new Error("Employee not found.");

            const hasAccount = employeesContext.hasUserID?.(employeeID); // Ensure function exists
            if (!hasAccount) throw new Error("No associated account found.");

            if (employee.user?.userID !== userID) throw new Error("User ID does not match employee record.");

            const updatedInfo = { userID, accessCode, newPassword, confirmPassword };

            const response = await fetch(`/api/employees/${employeeID}/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInfo)
            });

            if (!response.ok) throw new Error(`Failed to update password: ${response.statusText}`);

            const data = await response.json();
            console.log("Password update response:", data);

            employeesContext.setEmployees?.((prevState) => 
                prevState.map(emp => emp._id !== employeeID ? emp : { ...emp, ...data })
            );
        } catch (error) {
            console.error(error);
            employeesContext.handleAuthErr?.(error.message);
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
