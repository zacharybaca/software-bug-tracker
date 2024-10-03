import "./unassigned-tasks.css";
import { TasksContext } from "../../context/tasksContext";
import { EmployeesContext } from "../../context/employeesContext";
import Task from "../Task/Task";
import React from "react";

const UnAssignedTasks = () => {
  const tasksContext = React.useContext(TasksContext); // Clearer variable name
  const employeesContext = React.useContext(EmployeesContext);

  return (
    <div id="unassigned-task-list-container">
      <h1 id="unassigned-header">Un-Assigned Tasks:</h1>

      {tasksContext.unassignedTasks.length > 0 ? (
        <ul id="unassigned-task-list">
          {tasksContext.unassignedTasks.map((task) => (
            <React.Fragment key={task._id}>
              <li className="unassigned-task">
                <Task
                  id={task._id}
                  title={task.taskTitle}
                  completed={task.taskCompleted}
                  details={task.taskDetails}
                  assignedEmployee={task.assignedEmployee}
                  todos={task.taskTodos}
                  editTask={tasksContext.updateTask} // Use updateTask from tasksContext
                  deleteTask={tasksContext.deleteTask} // Use deleteTask from tasksContext
                  errMsg={employeesContext.userState.errMsg} // Passing error message for task
                />
              </li>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <h2 id="no-unassigned-tasks-heading">
          There Are No Un-Assigned Tasks to Display
        </h2>
      )}
    </div>
  );
};

export default UnAssignedTasks;
