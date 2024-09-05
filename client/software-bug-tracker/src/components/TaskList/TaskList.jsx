import './task-list.css';
import Task from '../Task/Task';
import React from 'react';
import { TasksContext } from '../../context/tasksContext';
import TaskForm from '../TaskForm/TaskForm';
import { Link } from 'react-router-dom';
import { EmployeesContextProvider } from '../../context/employeesContext';


const TaskList = () => {
  const context = React.useContext(TasksContext);


    return (
      <>
        <EmployeesContextProvider>
          <TaskForm submitTask={context.addTask} buttonText="Add Task"/>
        </EmployeesContextProvider>
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
              <><li key={task._id} className="task">
                <Task
                  title={task.taskTitle}
                  completed={task.taskCompleted}
                  details={task.taskDetails}
                  todos={task.taskTodos}
                  assigned={task.assignedEmployee} />
              </li><hr /></>
            ))}
          </ul>
      </>
    );
}

export default TaskList;
