import './snack-bar-notification.css';
import React from "react";
import chatEnteredImage from "../../assets/chat-entered.png";


const SnackBarNotification = ({ message, show, onShow, onClose, duration = 7000 }) => {
    

    
    React.useEffect(() => {
        onShow();
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, onShow, duration]);

    return (
        
        <div id="snack-bar-notification-container" className={`${show ? "show" : ""} atma-light`}>
            <img src={chatEnteredImage} />
            <h1 id="snack-bar-notification-header">{message}</h1>
        </div>
    )
}

export default SnackBarNotification;