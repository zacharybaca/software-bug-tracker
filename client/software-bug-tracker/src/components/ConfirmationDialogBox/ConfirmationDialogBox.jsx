import React from 'react';
import './confirmation-dialog-box.css';


const ConfirmationDialogBox = () => {
    const [showDialog, setShowDialog] = React.useState(true);

    const handleConfirm = () => {
        // Perform the action to be confirmed
        setShowDialog(false); // Close the dialog
      };
      
      const handleCancel = () => {
        setShowDialog(false); // Close the dialog
      };

      const handleDelete = () => {
        setShowDialog(true);
      };

    return (
        showDialog && (
            <div className="dialog-overlay">
              <div className="dialog-content">
                <h2 className="dialog-question">Are you sure you want to perform this action?</h2>
                <button type="button" className="confirm-button" onClick={handleConfirm}>Confirm</button>
                <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )
    )
}

export default ConfirmationDialogBox;
