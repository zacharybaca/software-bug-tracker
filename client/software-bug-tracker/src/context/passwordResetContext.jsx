import React from 'react';

const PasswordResetContext = React.createContext();


function PasswordResetContextProvider(props) {
    const [showPasswordResetForm, setShowPasswordResetForm] = React.useState(true);

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



    return (
        <PasswordResetContext.Provider
            value={{
                showPasswordResetForm,
                formData,
                handleChange,
                handleShowPasswordResetForm,
                handleClosePasswordResetForm
            }}>
            {props.children}
        </PasswordResetContext.Provider>
    );
}

export { PasswordResetContext, PasswordResetContextProvider };
