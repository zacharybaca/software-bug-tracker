import './error-modal.css';
import React from 'react';
import ErrorIcon from "../../assets/login-error-icon.jpg";

const ErrorModal = (props) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [errorStatement, setErrorStatement] = React.useState(props.errorStatement ? props.errorStatement : "")

    const handleDialog = () => {
        setShowDialog(prevState => !prevState);
        setErrorStatement("");
    };

    return (
        showDialog ? (
            <div id="error-dialog-overlay">
                <div id="error-dialog-content">
                    <div id="error-title-container">
                        <img src={ErrorIcon || props.errorIcon} id="error-icon"alt="error-icon" />
                    </div>
                    <h2 id="error-dialog-statement">
                        {errorStatement || "Unknown Error Has Occurred"}
                    </h2>
                    <button type="button" className="error-confirm-button glow-on-entra" onClick={handleDialog} value="okay">
                        ✅ Okay
                    </button>
                </div>
            </div>
        ) : ""
    );
}

export default ErrorModal;
