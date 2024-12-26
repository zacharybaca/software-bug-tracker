import './snack-bar-notification.css';
import chatEnteredImage from "../../assets/chat-entered.png";


const SnackBarNotification = ({ message, type, showToast }) => {

    return (
        <div id="snack-bar-notification-container" className={showToast ? `atma-light ${type}-toast` : 'atma-light'}>
            <img src={chatEnteredImage} />
            <h1 id="snack-bar-notification-header">{message}</h1>
        </div>
    )
}

export default SnackBarNotification;