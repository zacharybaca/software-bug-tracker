import React from 'react';
import './drop-down-menu.css';
import MenuIcon from '../../assets/menu-button.png';

const DropDownMenu = () => {
    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div id="drop-menu-container">
            <button id="menu-toggle-button" onClick={toggleMenu}>
                <img src={MenuIcon} id="menu-icon" alt="menu icon" />
            </button>
            {showMenu && (
                <div id="drop-down-container">
                    <div>Menu</div>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
