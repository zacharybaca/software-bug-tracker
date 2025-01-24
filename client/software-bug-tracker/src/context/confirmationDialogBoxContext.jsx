import React from 'react';

const ConfirmationDialogBoxContext = React.createContext();


function ConfirmationDialogBoxContextProvider(props) {
    const [showDialog, setShowDialog] = React.useState(true);
    const [proceed, setProceed] = React.useState(false);
    const [dialogQuestion, setDialogQuestion] = React.useState("");

    const handleConfirm = (e) => {
        if (e.target.value === 'confirm') {
            setShowDialog(false);
            setProceed(true);
        };
    };

    const handleCancel = (e) => {
        if (e.target.value === 'cancel') {
            setShowDialog(false);
            setProceed(false);
        };
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
                proceed,
                handleConfirm,
                handleCancel,
                handleDialogQuestion
            }}>
            {props.children}
        </ConfirmationDialogBoxContext.Provider>
    );
}

export { ConfirmationDialogBoxContext, ConfirmationDialogBoxContextProvider };
