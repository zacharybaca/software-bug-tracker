import React from 'react';
import './drop-down-menu.css';
import MenuIcon from '../../assets/menu-button.png';
import CloseButtonIcon from '../../assets/close-button.png';

const DropDownMenu = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    const toggleButton = () => setShowButton(!showButton);

    return (
        <div id="drop-menu-container">
            <button id="menu-toggle-button" onClick={toggleMenu}>
                <img src={MenuIcon} id="menu-icon" alt="menu icon" />
            </button>
            {showMenu && (
                <div id="drop-down-container">
                    {showButton && (
                        <div id="drop-down-items-container">
                            <div id="drop-down-items">
                                <img src={CloseButtonIcon} id="close-button-icon" alt="close button icon" onClick={toggleButton}/>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
