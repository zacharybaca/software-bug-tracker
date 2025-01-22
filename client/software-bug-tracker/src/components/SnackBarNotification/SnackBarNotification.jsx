import './snack-bar-notification.css';
import React from "react";
import chatEnteredImage from "../../assets/chat-entered.png";

const SnackBarNotification = ({ connectedUser, disconnectedUser, show, onShow, onClose, duration = 7000 }) => {

    React.useEffect(() => {
        onShow();
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, onShow, duration, connectedUser, disconnectedUser]);

    return (
            <div id="snack-bar-notification-container" className={`${show ? "show" : ""} atma-light`}>
                <img src={chatEnteredImage} />
                <h1 id="snack-bar-notification-header">{connectedUser && connectedUser.name ? `${connectedUser.name.user.userID} has logged into Live Support` : disconnectedUser && disconnectedUser.name ? `${disconnectedUser.name.user.userID} has logged out of Live Support` : ""}</h1>
            </div>
    )
}

export default SnackBarNotification;
