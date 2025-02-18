import React from 'react';

const ConfirmationDialogBoxContext = React.createContext();


function ConfirmationDialogBoxContextProvider(props) {
    const [showDialog, setShowDialog] = React.useState(true);
    const [proceed, setProceed] = React.useState(false);
    const [enableBackgroundOptions, setEnableBackgroundOptions] = React.useState(false);
    const [dialogQuestion, setDialogQuestion] = React.useState("");
    const [background, setBackground] = React.useState(localStorage.getItem("background") || "background-default");

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

    const handleBackgroundOptions = (e) => {
        if (!localStorage.getItem("background")) {
            localStorage.setItem("background", e.target.value);
            setBackground(localStorage.getItem("background"));
        }
        else if (localStorage.getItem("background")) {
            if (e.target.value && e.target.value !== localStorage.getItem("background")) {
                localStorage.removeItem("background");
                localStorage.setItem("background", e.target.value);
                setBackground(localStorage.getItem("background"));
            }
            else {
                setBackground(localStorage.getItem("background"));
            }
        }
    };

    const toggleBackgroundOptions = (question) => {
        setEnableBackgroundOptions(prevState => !prevState);
        if (enableBackgroundOptions) {
            setDialogQuestion(question);
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
                proceed,
                background,
                enableBackgroundOptions,
                handleConfirm,
                handleCancel,
                handleDialogQuestion,
                handleBackgroundOptions,
                toggleBackgroundOptions
            }}>
            {props.children}
        </ConfirmationDialogBoxContext.Provider>
    );
}

export { ConfirmationDialogBoxContext, ConfirmationDialogBoxContextProvider };
