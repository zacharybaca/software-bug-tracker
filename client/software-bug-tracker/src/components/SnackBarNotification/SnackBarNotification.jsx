import './snack-bar-notification.css';
import React from "react";
import chatEnteredImage from "../../assets/chat-entered.png";

const SnackBarNotification = ({ connectedUser, show, onShow, onClose, duration = 7000 }) => {
    
    React.useEffect(() => {
        onShow(connectedUser);
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, onShow, duration, connectedUser]);
    
    return (
        <div id="snack-bar-notification-container" className={`${show ? "show" : ""} atma-light`}>
            <img src={chatEnteredImage} />
            <h1 id="snack-bar-notification-header">{connectedUser ? connectedUser : ""} has logged into Live Support.</h1>
        </div>
    )
}

export default SnackBarNotification;