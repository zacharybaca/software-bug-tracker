import React from 'react';

const ConfirmationDialogBoxContext = React.createContext();


function ConfirmationDialogBoxContextProvider(props) {
    const [showDialog, setShowDialog] = React.useState(true);
    const [dialogQuestion, setDialogQuestion] = React.useState("");

    const handleConfirm = (e) => {
        if (e.target.value === 'confirm') {
            setShowDialog(false);
            return true;
        }
    };

    const handleCancel = (e) => {
        if (e.target.value === 'cancel') {
            setShowDialog(false);
            return false;
        }
    };

    const handleDialogQuestion = (question) => {
        setShowDialog(true);
        setDialogQuestion(question);
    };
    
    return (
        <ConfirmationDialogBoxContext.Provider
            value={{
                showDialog,
                dialogQuestion,
                handleConfirm,
                handleCancel,
                handleDialogQuestion
            }}>
            {props.children}
        </ConfirmationDialogBoxContext.Provider>
    );
}

export { ConfirmationDialogBoxContext, ConfirmationDialogBoxContextProvider };
