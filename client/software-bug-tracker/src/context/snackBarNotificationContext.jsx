import React from 'react';

const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(true);
    const [connectedUser, setConnectedUser] = React.useState("");
    const [disconnectedUser, setDisconnectedUser] = React.useState("");

    const handleShowToast = () => {
        if (connectedUser) {
            setShowToast(true);
            setConnectedUser(connectedUser);
        }
        else if (disconnectedUser) {
            setShowToast(true);
            setDisconnectedUser(disconnectedUser);
        }
        
    };

    const handleCloseToast = () => {
        if (connectedUser) {
            setShowToast(false);
            setConnectedUser("");
        }
        else if (disconnectedUser) {
            setShowToast(false);
            setDisconnectedUser("");
        }
        
    };

    return (
        <SnackBarNotificationContext.Provider
            value={{
                showToast,
                connectedUser,
                disconnectedUser,
                setConnectedUser,
                setDisconnectedUser,
                handleShowToast,
                handleCloseToast
            }}
        >
            {props.children}
        </SnackBarNotificationContext.Provider>
    );
}

export { SnackBarNotificationContext, SnackBarNotificationContextProvider };