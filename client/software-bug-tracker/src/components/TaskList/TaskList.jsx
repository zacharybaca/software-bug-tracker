import "./task-list.css";
import Task from "../Task/Task";
import React from "react";
import { TasksContext } from "../../context/tasksContext";
import { EmployeesContext } from "../../context/employeesContext";
import TaskForm from "../TaskForm/TaskForm";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasksContext = React.useContext(TasksContext);
  const employeesContext = React.useContext(EmployeesContext);

  const [selectFiltered, setSelectFiltered] = React.useState("");

  const handleFilter = (e) => {
    const { value } = e.target;
    setSelectFiltered(value);

    if (value === "completed") {
      tasksContext.completed();
    } else if (value === "incompleted") {
      tasksContext.incomplete();
    } else if (value === "all") {
      tasksContext.getTasks();
    }

    // Commented this out to maintain filter selection after filtering
    // setSelectFiltered("");
  };

  return (
    <>
      <TaskForm
        submitTask={tasksContext.addTask}
        buttonText="Add Task"
        errMsg={employeesContext.userState.errMsg}
      />

      {employeesContext.hasAdminRights() && (
        <div id="add-employee-button-container">
          <Link to="/add-employee">
            <button type="button" id="add-employee-main-button">
              Add Employee
            </button>
          </Link>
        </div>
      )}

      <div id="task-list-filter-container">
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

      <h2 id="heading-above-tasks">
        {employeesContext.hasAdminRights()
          ? "All Employee Assigned Tasks: "
          : "Tasks That Are Assigned to You: "}
      </h2>

      <ul id="task-list">
        {Array.isArray(tasksContext.tasks) ? (
          tasksContext.tasks.map((task) => (
            <React.Fragment key={task._id}>
              <li className="task">
                <Task
                  id={task._id}
                  title={task.taskTitle}
                  completed={task.taskCompleted}
                  details={task.taskDetails}
                  assignedEmployee={task.assignedEmployee}
                  todos={task.taskTodos}
                  editTask={tasksContext.updateTask}
                  deleteTask={tasksContext.deleteTask}
                  errMsg={employeesContext.userState.errMsg}
                />
              </li>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </>
  );
};

export default TaskList;
