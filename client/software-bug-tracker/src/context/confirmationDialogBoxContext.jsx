import React from 'react';

const ConfirmationDialogBoxContext = React.createContext();


function ConfirmationDialogBoxContextProvider(props) {
    const [showDialog, setShowDialog] = React.useState(true);
    const [dialogQuestion, setDialogQuestion] = React.useState("");

    const handleConfirm = () => {
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    const handleDelete = () => {
        setShowDialog(true);
    };

    const handleDialogQuestion = (question) => {
        setShowDialog(true);
        setDialogQuestion(question);
    }
    return (
        <ConfirmationDialogBoxContext.Provider
            value={{
                showDialog,
                dialogQuestion,
                handleConfirm,
                handleCancel,
                handleDelete,
                handleDialogQuestion
            }}>
            {props.children}
        </ConfirmationDialogBoxContext.Provider>
    );
}

export { ConfirmationDialogBoxContext, ConfirmationDialogBoxContextProvider };
