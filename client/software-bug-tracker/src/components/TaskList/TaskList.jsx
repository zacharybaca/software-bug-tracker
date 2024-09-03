import './task-list.css';
import Task from '../Task/Task';
import React from 'react';
import { TasksContext } from '../../context/tasksContext';
import { Link } from 'react-router-dom';


const TaskList = () => {
  const context = React.useContext(TasksContext);


    return (
      <>
        <div id="action-buttons">
          <Link to="/tasks">
            <button type="button" id="add-task-main-button">
              Add Task
            </button>
          </Link>
          <Link to="/add-employee">
            <button type="button" id="add-employee-main-button">
              Add Employee
            </button>
          </Link>
        </div>
          <ul id="task-list">
            {context.tasks.map((task) => (
              <Task
                key={task._id}
                title={task.taskTitle}
                completed={task.taskCompleted}
                details={task.taskDetails}
                todos={task.taskTodos}
                assigned={task.assignedEmployee}
              />
            ))}
          </ul>
      </>
    );
}

export default TaskList;