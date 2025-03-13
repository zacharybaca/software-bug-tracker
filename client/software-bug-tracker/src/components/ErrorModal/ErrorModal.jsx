import './error-modal.css';
import PropTypes from 'prop-types';
import ErrorIcon from "../../assets/login-error-icon.jpg";

const ErrorModal = ({ errorStatement, errorIcon, onClose }) => {
    return errorStatement ? (
        <div id="error-dialog-overlay" role="dialog" aria-hidden={!errorStatement}>
            <div id="error-dialog-content">
                <div id="error-title-container">
                    <img src={errorIcon || ErrorIcon} id="error-icon" alt="error icon" />
                </div>
                <h2 id="error-dialog-statement">
                    {errorStatement || "Unknown Error Has Occurred"}
                </h2>
                <button type="button" className="error-confirm-button glow-on-entra" onClick={onClose}>
                    ✅ Okay
                </button>
            </div>
        </div>
    ) : null;
};

ErrorModal.propTypes = {
    errorStatement: PropTypes.string,
    errorIcon: PropTypes.string,
    onClose: PropTypes.func.isRequired, // Ensures the parent provides this function
};

export default ErrorModal;
