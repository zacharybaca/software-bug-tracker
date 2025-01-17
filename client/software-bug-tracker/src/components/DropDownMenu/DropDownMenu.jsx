import React from 'react';
import './drop-down-menu.css';
import MenuIcon from '../../assets/menu-button.png';


const DropDownMenu = () => {
    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => {
        showMenu ? setShowMenu(false) : setShowMenu(true);
    }

    return (
        <div id="drop-menu-container" toggleMenu={toggleMenu}>
            {showMenu ? <div>Menu</div> :  <div id="drop-down-container">
                <img src={MenuIcon} id="menu-icon" alt="menu icon" />
            </div>}
        </div>
    )
}

export default DropDownMenu;
