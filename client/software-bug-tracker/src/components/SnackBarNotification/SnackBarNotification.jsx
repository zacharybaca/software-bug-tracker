import './snack-bar-notification.css';
import React, { useEffect } from "react";
import chatEnteredImage from "../../assets/chat-entered.png";


const SnackBarNotification = ({ message, type, showToast, onClose, duration = 3000 }) => {
    const [visible, setVisible] = React.useState(true);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        
        <div id="snack-bar-notification-container" className={`toast-notification ${visible ? "show" : ""} atma-light ${type}-toast`}>
            <img src={chatEnteredImage} />
            <h1 id="snack-bar-notification-header">{message}</h1>
        </div>
    )
}

export default SnackBarNotification;
