import React from 'react';
import { EmployeesContext } from './employeesContext';

const PasswordResetContext = React.createContext();


function PasswordResetContextProvider(props) {
    const [showPasswordResetForm, setShowPasswordResetForm] = React.useState(true);
    const employeesContext = React.useContext(EmployeesContext);

     const initialValues = {
            userID: "",
            accessCode: "",
            newPassword: "",
            confirmPassword: ""
    };

    const [formData, setFormData] = React.useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleShowPasswordResetForm = (e) => {
        if (e.target.value === 'change password') {
            setShowPasswordResetForm(true);
        };
    };

    const handleClosePasswordResetForm = (e) => {
        if (e.target.value === 'close') {
            setShowPasswordResetForm(false);
        };
    };

    const updateEmployeePassword = async (userID, accessCode, newPassword, confirmPassword, employeeID) => {
        const employee = await employeesContext.employees.find(employee => employee._id === employeeID);

        if (employee) {
            const hasAccount = await employeesContext.hasUserID(employeeID);

            if (hasAccount) {
                const username = employee.user.userID;

                if (username === userID) {
                    const updatedInfo = {
                        userID,
                        accessCode,
                        newPassword,
                        confirmPassword
                    };

                    try {
                       const response = await fetch(`/api/employees/${employeeID}/reset-password`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedInfo)
                       });

                       if (!response.ok) {
                        throw new Error(`Failed to update password: ${response.statusText}`);
                       }

                       const data = await response.json();

                       employeesContext.setEmployees((prevState) => prevState.map((employee) => (employee._id !== employeeID ? employee : data)));
                    } catch (error) {
                        employeesContext.handleAuthErr(error.message);
                    }
                }
            }
        }
    }

    return (
        <PasswordResetContext.Provider
            value={{
                showPasswordResetForm,
                formData,
                handleChange,
                handleShowPasswordResetForm,
                handleClosePasswordResetForm,
                updateEmployeePassword
            }}>
            {props.children}
        </PasswordResetContext.Provider>
    );
}

export { PasswordResetContext, PasswordResetContextProvider };
