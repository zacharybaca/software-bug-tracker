import './error-modal.css';
import React from 'react';
import ErrorIcon from "../../assets/login-error-icon.jpg";

const ErrorModal = (props) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [errorStatement, setErrorStatement] = React.useState("");

    React.useEffect(() => {
        if (props.errorStatement) {
            setErrorStatement(props.errorStatement);
            setShowDialog(true);
        }
    }, [props.errorStatement]);

    const handleDialog = () => {
        setShowDialog(false);
        setErrorStatement("");
    };

    return showDialog ? (
        <div id="error-dialog-overlay">
            <div id="error-dialog-content">
                <div id="error-title-container">
                    <img src={props.errorIcon || ErrorIcon} id="error-icon" alt="error-icon" />
                </div>
                <h2 id="error-dialog-statement">
                    {errorStatement || "Unknown Error Has Occurred"}
                </h2>
                <button type="button" className="error-confirm-button glow-on-entra" onClick={handleDialog}>
                    ✅ Okay
                </button>
            </div>
        </div>
    ) : null;
}

export default ErrorModal;
