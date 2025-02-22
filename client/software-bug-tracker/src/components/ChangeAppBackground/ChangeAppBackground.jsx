import React from 'react';
import './change-app-background.css';
import { ConfirmationDialogBoxContext } from '../../context/confirmationDialogBoxContext';
import ReusableStyledButton from '../ReusableStyledButton/ReusableStyledButton';


const ChangeAppBackground = () => {
    const context = React.useContext(ConfirmationDialogBoxContext);

    return (
        context.enableBackgroundOptions ? (
            <div className={context.enableBackgroundOptions ? "dialog-overlay" : "dialog-overlay-only-button-container"}>
                <div className="dialog-items">
                    <h2 className="background-question">
                        {context.dialogQuestion ? context.dialogQuestion : ""}
                    </h2>
                    <div className="background-options">
                        <label htmlFor="background">Select A Background</label>
                        <select
                            id="background"
                            name="background"
                            onChange={context.handleBackgroundOptions}
                            value={context.background}
                        >
                            <option disabled>Select A Background</option>
                            <option value="background1">Background 1</option>
                            <option value="background2">Background 2</option>
                            <option value="background3">Background 3</option>
                            <option value="background4">Background 4</option>
                            <option value="background5">Background 5</option>
                            <option value="background6">Background 6</option>
                        </select>
                    </div>
                    <button type="button" className="close-button glow-on-arrival" onClick={() => context.toggleBackgroundOptions("Make a Background Selection for the App.")}>
                        ❎ Close
                    </button>
                </div>
            </div>
        )
            : <ReusableStyledButton
                type="button"
                title="Set Wallpaper"
                clickFunction={() => context.toggleBackgroundOptions("Make a Background Selection for the App.")}
              />
    )
}


export default ChangeAppBackground;
