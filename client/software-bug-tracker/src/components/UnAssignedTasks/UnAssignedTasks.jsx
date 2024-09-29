import './unassigned-tasks.css';
// import { TasksContext } from '../../context/employeesContext';
import React from 'react';

const UnAssignedTasks = () => {
    // const context = React.useContext(TasksContext);
    return (
        <div id="unassigned-tasks-list-container">
            <ul id="unassigned-tasks-list">
                <li className="unassigned-task">
                    <h1>Title</h1>
                    <h3>Description</h3>
                </li>
            </ul>
        </div>
    )
}

export default UnAssignedTasks;