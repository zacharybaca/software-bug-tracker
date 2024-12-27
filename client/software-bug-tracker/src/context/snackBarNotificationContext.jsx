import React from 'react';


const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(true);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <SnackBarNotificationContext.Provider
            value={{
                showToast,
                handleShowToast,
                handleCloseToast
            }}
        >
            {props.children}
        </SnackBarNotificationContext.Provider>
    );
}

export { SnackBarNotificationContext, SnackBarNotificationContextProvider };
