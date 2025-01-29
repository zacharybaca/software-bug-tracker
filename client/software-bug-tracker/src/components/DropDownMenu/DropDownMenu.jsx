import React from 'react';
import './drop-down-menu.css';
import StickyNavBar from '../StickyNavBar/StickyNavBar';
import MenuIcon from '../../assets/bug-menu-icon.png';
import CloseButtonIcon from '../../assets/close-button.png';
import { EmployeesContext } from '../../context/employeesContext';

const DropDownMenu = (props) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const context = React.useContext(EmployeesContext);
    const loggedInEmployee = context.getLoggedInEmployee();

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        loggedInEmployee && (
            <div>
            <button id="menu-toggle-button" className="glow-on-enter" onClick={toggleMenu}>
                <img
                    src={showMenu ? CloseButtonIcon : MenuIcon}
                    id={showMenu ? 'close-button-icon' : 'menu-icon'}
                    alt={showMenu ? 'close menu icon' : 'menu icon'}
                />
                <h1 id="menu-button-heading">Menu</h1>
            </button>

            <div className={`menu ${showMenu ? 'open' : ""}`}>
                <StickyNavBar navigate={props.navigate} showMenu={showMenu} toggleMenu={toggleMenu} />
            </div>
        </div>
        )
    );
};

export default DropDownMenu;
