import "./task-list.css";
import Task from "../Task/Task";
import React from "react";
import { TasksContext } from "../../context/tasksContext";
import { EmployeesContext } from "../../context/employeesContext";
import { ConfirmationDialogBoxContext } from "../../context/confirmationDialogBoxContext";
import TaskForm from "../TaskForm/TaskForm";

const TaskList = () => {
  const tasksContext = React.useContext(TasksContext);
  const employeesContext = React.useContext(EmployeesContext);
  const confirmationContext = React.useContext(ConfirmationDialogBoxContext);

  const [selectFiltered, setSelectFiltered] = React.useState("");
  const [updateInputs, setUpdateInputs] = React.useState({});

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
  };

  const handleUpdateChange = (taskId, value) => {
    setUpdateInputs((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleSaveUpdate = (taskId) => {
    const updateText = updateInputs[taskId]?.trim();
    if (updateText) {
      const updatedTask = tasksContext.tasks.find((task) => task._id === taskId);
      const newUpdates = [
        ...(updatedTask.taskUpdates || []), // Ensure it's an array
        { updateText, updatedAt: new Date() },
      ];

      tasksContext.updateTask(taskId, { taskUpdates: newUpdates });
      setUpdateInputs((prev) => ({ ...prev, [taskId]: "" }));
    }
  };

  return (
    <>
      <TaskForm
        submitTask={tasksContext.addTask}
        buttonText="Add Task"
        errMsg={employeesContext.userState.errMsg}
      />

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

      {tasksContext.tasks.length === 0 ? (<h1 id="no-tasks-assigned-heading">No Tasks Assigned</h1>) :
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
                  confirmation={confirmationContext.proceed}
                  handleQuestion={confirmationContext.handleDialogQuestion}
                />
                {/* Updates Section */}
                <div className="task-updates-section">
                  <h4>Task Updates:</h4>
                  <ul>
                    {(task.taskUpdates || []).map((update, index) => (
                      <li key={index}>
                        {update.updateText} — {new Date(update.updatedAt).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                  <textarea
                    value={updateInputs[task._id] || ""}
                    onChange={(e) => handleUpdateChange(task._id, e.target.value)}
                    placeholder="Add an update..."
                  />
                  <button onClick={() => handleSaveUpdate(task._id)}>Save Update</button>
                </div>
              </li>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p id="no-tasks-para">No tasks available</p>
        )}
      </ul>
      }
    </>
  );
};

export default TaskList;
