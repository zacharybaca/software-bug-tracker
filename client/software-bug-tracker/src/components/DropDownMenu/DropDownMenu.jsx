import React from 'react';
import './drop-down-menu.css';
import MenuIcon from '../../assets/menu-button.png';
import CloseButtonIcon from '../../assets/close-button.png';

const DropDownMenu = () => {
    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div id="drop-menu-container">
            <button id="menu-toggle-button" onClick={toggleMenu}>
                <img
                    src={showMenu ? CloseButtonIcon : MenuIcon}
                    id="menu-icon"
                    alt={showMenu ? 'close menu icon' : 'menu icon'}
                />
            </button>
            {showMenu && (
                <div id="drop-down-container">
                    <div id="drop-down-items-container">
                        <div id="drop-down-items">
                            <p>Menu Item 1</p>
                            <p>Menu Item 2</p>
                            <p>Menu Item 3</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
