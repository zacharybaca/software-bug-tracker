import React from 'react';


const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(true);
    const [connectedUser, setConnectedUser] = React.useState("");

    const handleShowToast = (loggedInUser) => {
        setShowToast(true);
        setConnectedUser(loggedInUser);
    };

    const handleCloseToast = () => {
        setShowToast(false);
        setConnectedUser("");
    };

    return (
        <SnackBarNotificationContext.Provider
            value={{
                showToast,
                connectedUser,
                handleShowToast,
                handleCloseToast
            }}
        >
            {props.children}
        </SnackBarNotificationContext.Provider>
    );
}

export { SnackBarNotificationContext, SnackBarNotificationContextProvider };
