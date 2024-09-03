import './task-list.css';
import Task from '../Task/Task';
import React from 'react';
import { TasksContext } from '../../context/tasksContext';


const TaskList = () => {
  const context = React.useContext(TasksContext);


    return (
      <ul id="task-list">
        {context.tasks.map(task => (
          <Task key={task._id} title={task.taskTitle} completed={task.taskCompleted} details={task.taskDetails} todos={task.taskTodos} assigned={task.assignedEmployee}/>
        ))}
      </ul>
    );
}

export default TaskList;