import './unassigned-tasks.css';
import { TasksContext } from '../../context/tasksContext';
import { EmployeesContext } from '../../context/employeesContext';
import Task from '../Task/Task';
import React from 'react';

const UnAssignedTasks = () => {
    const context = React.useContext(TasksContext);
    const employeeContext = React.useContext(EmployeesContext);
    return (
      <div id="unassigned-task-list-container">
        <h1 id="unassigned-header">Un-Assigned Tasks:</h1>
        <ul id="unassigned-task-list">
          {context.unassignedTasks.map((task) => (
            <React.Fragment key={task._id}>
              <li className="unassigned-task">
                <Task
                  id={task._id}
                  title={task.taskTitle}
                  completed={task.taskCompleted}
                  details={task.taskDetails}
                  assignedEmployee={task.assignedEmployee}
                  todos={task.taskTodos}
                  editTask={context.updateTask}
                  deleteTask={context.deleteTask}
                  errMsg={employeeContext.userState.errMsg}
                />
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
}

export default UnAssignedTasks;