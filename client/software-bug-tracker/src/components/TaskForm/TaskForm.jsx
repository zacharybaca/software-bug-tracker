import "./task-form.css";
import React from "react";
import { EmployeesContext } from "../../context/employeesContext";

const TaskForm = (props) => {
  const context = React.useContext(EmployeesContext);

  // State for Individual Tasks
  const initialValues = {
    id: props.id || "",
    taskTitle: props.title || "",
    taskCompleted: props.completed || false,
    taskDetails: props.details || "",
    taskTodos: props.todos || "",
    assignedEmployee: props.assignedEmployee || context.getLoggedInEmployee() || "",
  };

  const [task, setTask] = React.useState(initialValues);

  // Handle input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const formattedTodos = task.taskTodos
      .split(".")
      .map((todo) => todo.trim())
      .filter((todo) => todo)
      .join(".\n");

    const updatedTask = {
      ...task,
      taskTodos: formattedTodos,
    };
    props.submitTask(updatedTask, task.id); // Submit the updated task object
    setTask(initialValues); // Reset the form

    if (props.toggleForm) {
      props.toggleForm((prevState) => !prevState);
      context.resetAuthErr();
    }
  }


  return (
    <form id="task-form" name="taskForm" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task Title: </label>
      <input
        type="text"
        id="task-title"
        name="taskTitle"
        value={task.taskTitle}
        onChange={handleChange}
        placeholder="Enter Title"
      />

      <label htmlFor="task-details">Task Details: </label>
      <input
        type="text"
        id="task-details"
        name="taskDetails"
        value={task.taskDetails}
        onChange={handleChange}
        placeholder="Enter Description"
      />

      <label htmlFor="task-todos">Task Todo Items: </label>
      <textarea
        id="task-todos"
        name="taskTodos"
        value={task.taskTodos}
        onChange={handleChange}
        placeholder="Enter Each Todo Item Followed By a Period"
      />

      {/* Employee Assignment */}
      {context.hasAdminRights() ? (
        <>
          <label htmlFor="assigned-employee">Assign Task: </label>
          <select
            id="assigned-employee"
            name="assignedEmployee" // Use the employee's ID as the value
            value={task.assignedEmployee}
            onChange={handleChange}>
            <option value="">Select An Employee</option>
            {context.employees.map((employee) => (
              <option value={employee._id} key={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <h3 id="employee-heading-container">
            Assigned Employee:{" "}
            <span id="assigned-employee-heading">
              {task.assignedEmployee
                ? `${task.assignedEmployee.firstName} ${task.assignedEmployee.lastName}`
                : "None"}
            </span>
          </h3>
        </>
      )}

      {/* Task Completed Checkbox */}
      <label htmlFor="task-completed">Task Completed: </label>
      <input
        type="checkbox"
        id="task-completed"
        name="taskCompleted"
        checked={task.taskCompleted} // Checkbox uses checked, not value
        onChange={handleChange}
        disabled={!props.assignedEmployee}
      />

      <button type="submit" id="add-task-button">
        {props.buttonText}
      </button>
      <p style={{ color: "red" }}>{props.errMsg}</p>
    </form>
  );
};

export default TaskForm;
