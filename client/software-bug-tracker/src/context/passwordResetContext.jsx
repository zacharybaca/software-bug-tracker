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

    const updateEmployeePassword = async (userID, accessCode, newPassword, confirmPassword) => {
        try {
            const employee = employeesContext.employees.find(emp => emp.user.userID === userID);
    
            if (!employee) {
                throw { message: "User not found", type: "userID" };
            }
    
            const response = await fetch(`/api/employees/${employee._id}/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID, accessCode, newPassword, confirmPassword }),
            });
    
            if (response.status === 401) {
                throw { message: "Invalid access code.", type: "accessCode" };
            } else if (response.status === 400) {
                throw { message: "Passwords do not match.", type: "password" };
            } else if (response.status === 403) {
                throw { message: "You are not authorized to view this content.", type: "access"};
            }
             else if (!response.ok) {
                throw { message: `Server error: ${response.statusText}`, type: "general" };
            }
    
            const updatedEmployee = await response.json();
    
            employeesContext.setEmployees(prevEmployees =>
                prevEmployees.map(emp => (emp._id !== employee._id ? emp : updatedEmployee))
            );
    
        } catch (error) {
            employeesContext.handleAuthErr(error);
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
