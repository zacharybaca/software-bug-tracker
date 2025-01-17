import React from 'react';

const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(false);
    const [connectedUser, setConnectedUser] = React.useState("");
    const [disconnectedUser, setDisconnectedUser] = React.useState("");

    const handleShowToast = () => {
        connectedUser || disconnectedUser ? setShowToast(true) : setShowToast(false);
        connectedUser && connectedUser.name ? setConnectedUser(connectedUser.name) : setConnectedUser("");
        disconnectedUser && disconnectedUser.name ? setDisconnectedUser(disconnectedUser.name) : setDisconnectedUser("");
    };

    const handleCloseToast = () => {
       setShowToast(false);
       connectedUser ? setConnectedUser("") : setDisconnectedUser("");

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
