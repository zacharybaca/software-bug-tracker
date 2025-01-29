import React from 'react';
import './sticky-nav-bar.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import TasksButton from '../TasksButton/TasksButton';
import EmployeeDirectoryButton from '../EmployeeDirectoryButton/EmployeeDirectoryButton';
import { EmployeesContext } from '../../context/employeesContext';
import UnassignedTask from '../../assets/unassigned-tasks.gif';
import Networking from '../../assets/networking.gif';
import AddEmployee from '../../assets/add-user.gif';


const StickyNavBar = (props) => {
    const context = React.useContext(EmployeesContext);
    const loggedInEmployee = context.getLoggedInEmployee();

    return (
      loggedInEmployee && (
        <div id="main-nav-container">
        {props.showMenu && (
          <div id="nav-button-container">
            <LogOutButton logout={context.logout} showMenu={props.showMenu} setShowMenu={props.toggleMenu}/>
            <TasksButton navigate={props.navigate} showMenu={props.showMenu} setShowMenu={props.toggleMenu}/>
            {context.employees.length > 0 && context.hasAdminRights() ? (
              <EmployeeDirectoryButton navigate={props.navigate} showMenu={props.showMenu} setShowMenu={props.toggleMenu}/>
            ) : null}
            <button
              type="button"
              className="glow-on-entry"
              id="unassigned-tasks-button"
              onClick={() => {
                props.navigate("/unassigned-tasks");
                props.toggleMenu(!props.showMenu);
              }}>
              <img src={UnassignedTask} />
              Un-Assigned Tasks
            </button>
            <button
              type="button"
              className="glow-on-entry"
              id="live-support-button"
              onClick={() => {
                props.navigate("/messages");
                props.toggleMenu(!props.showMenu);
              }}>
              <img src={Networking} id="networking-image" />
              Connect With Other Employees
            </button>
            {context.hasAdminRights() && (
              <button
                type="button"
                className="glow-on-entry"
                id="add-employee-main-button"
                onClick={() => {
                  props.navigate("/add-employee");
                  props.toggleMenu(!props.showMenu);
                }}>
                <img src={AddEmployee} />
                Add Employee
              </button>
            )}
          </div>
        )}
        </div>
      )  
  );
};

export default StickyNavBar;
