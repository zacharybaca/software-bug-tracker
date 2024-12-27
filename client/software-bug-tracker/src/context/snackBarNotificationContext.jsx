import React from 'react';


const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(true);
    const [connectedUser, setConnectedUser] = React.useState("");
    console.log('Connected Outside of Functions: ', connectedUser);
    const handleShowToast = (loggedInUser) => {
        setShowToast(true);
        setConnectedUser(loggedInUser);
        console.log('Connected on Show: ', connectedUser);
    };

    const handleCloseToast = () => {
        setShowToast(false);
        setConnectedUser("");
        console.log('Connected on Close: ', connectedUser);
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
