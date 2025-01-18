import React from 'react';
import './drop-down-menu.css';
import StickyNavBar from '../StickyNavBar/StickyNavBar';
import MenuIcon from '../../assets/menu-button.png';
import CloseButtonIcon from '../../assets/close-button.png';

const DropDownMenu = (props) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div id="drop-menu-container">
            <button id="menu-toggle-button" onClick={toggleMenu}>
                <img
                    src={showMenu ? CloseButtonIcon : MenuIcon}
                    id={showMenu ? 'close-button-icon' : 'menu-icon'}
                    alt={showMenu ? 'close menu icon' : 'menu icon'}
                />
            </button>
            {showMenu && (
                <StickyNavBar navigate={props.navigate}/>
            )}
        </div>
    );
};

export default DropDownMenu;
