import './task-list.css';
import Task from '../Task/Task';
import React from 'react';
import { TasksContext } from '../../context/tasksContext';
import { EmployeesContext } from '../../context/employeesContext';
import TaskForm from '../TaskForm/TaskForm';
import { Link } from 'react-router-dom';



const TaskList = () => {
  const context = React.useContext(TasksContext);
  const employeeContext = React.useContext(EmployeesContext);

  const [selectFiltered, setSelectFiltered] = React.useState("");

  const handleFilter = (e) => {
    const { value } = e.target;

    setSelectFiltered(value);

    if (value === 'completed') {
      context.completed();
    }
    else if (value === 'incompleted') {
      context.incomplete();
    }
    else if (value === 'all') {
      context.getTasks();
    }
    setSelectFiltered("");
  }

    return (
      <>
        <TaskForm
          submitTask={context.addTask}
          buttonText="Add Task"
          errMsg={employeeContext.userState.errMsg}
        />
        {employeeContext.hasAdminRights() ? (
          <div id="action-buttons">
            <Link to="/add-employee">
              <button type="button" id="add-employee-main-button">
                Add Employee
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div id="filtered-container">
          <select
            id="filterTasks"
            name="filterTasks"
            value={selectFiltered}
            onChange={handleFilter}>
            <option value="">Select An Option To Filter Tasks</option>
            <option value="all">Show All Tasks</option>
            <option value="completed">Show Completed Tasks</option>
            <option value="incompleted">Show Incompleted Tasks</option>
          </select>
        </div>
        <h2 id="heading-above-tasks">Tasks That Are Assigned to You: </h2>
        <ul id="task-list">
          {context.tasks.map((task) => (
            <React.Fragment key={task._id}>
              <li className="task">
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
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </>
    );
}

export default TaskList;
