import './task-list.css';
import Task from '../Task/Task';
import React from 'react';
import { TasksContext } from '../../context/tasksContext';
import TaskForm from '../TaskForm/TaskForm';
import { Link } from 'react-router-dom';
import { EmployeesContextProvider } from '../../context/employeesContext';
import { EmployeesContext } from '../../context/employeesContext';


const TaskList = () => {
  const context = React.useContext(TasksContext);
  const employeesContext = React.useContext(EmployeesContext);

    return (
      <>
        <EmployeesContextProvider>
          <TaskForm submitTask={context.addTask} buttonText="Add Task"/>
        </EmployeesContextProvider>
        <div id="action-buttons">
          
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
                  id={task._id}
                  title={task.taskTitle}
                  completed={task.taskCompleted}
                  details={task.taskDetails}
                  todos={task.taskTodos}
                  editTask={context.editTask}
                  deleteTask={context.deleteTask}
                  assigned={employeesContext.employees.map(employee => employee._id === task.assignedEmployee ? employee.firstName : "")} />
              </li><hr /></>
            ))}
          </ul>
      </>
    );
}

export default TaskList;
