import React from 'react';
import './confirmation-dialog-box.css';


const ConfirmationDialogBox = () => {
    const [showDialog, setShowDialog] = React.useState(false);

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
                <p>Are you sure you want to perform this action?</p>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )
    )
}

export default ConfirmationDialogBox;
