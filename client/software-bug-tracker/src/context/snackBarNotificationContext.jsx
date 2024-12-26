import React from 'react';


const SnackBarNotificationContext = React.createContext();


function SnackBarNotificationContextProvider(props) {
    const [showToast, setShowToast] = React.useState(true);

    return (
        <SnackBarNotificationContext.Provider
            value={{
                showToast,
                setShowToast
            }}
        >
            {props.children}
        </SnackBarNotificationContext.Provider>
    );
}

export { SnackBarNotificationContext, SnackBarNotificationContextProvider };