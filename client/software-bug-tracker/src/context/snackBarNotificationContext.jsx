import React from 'react';

const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(false);
    const [connectedUser, setConnectedUser] = React.useState("");
    const [disconnectedUser, setDisconnectedUser] = React.useState("");

    const handleShowToast = () => {
        setShowToast(true);
        console.log("Connected User: ", connectedUser && connectedUser.name);
        console.log("Disconnected User: ", disconnectedUser && disconnectedUser.name);
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
