import "./task-form.css";
import React from "react";
import { EmployeesContext } from "../../context/employeesContext";

const TaskForm = (props) => {
  const context = React.useContext(EmployeesContext);

  // State for Individual Tasks
  const initialValues = {
    id: props.id || "",
    taskTitle: props.taskTitle || "",
    taskCompleted: props.taskCompleted || false,
    taskDetails: props.taskDetails || "",
    taskTodos: props.taskTodos || "",
    assignedId: props.assignedId || "",
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

    // Format the taskTodos field before submitting
    const formattedTodos = task.taskTodos
      .split(".")
      .map((todo) => todo.trim())
      .filter((todo) => todo)
      .join(".\n");

    const updatedTask = {
      ...task,
      taskTodos: formattedTodos, // Ensure taskTodos is formatted properly
    };

    props.submitTask(updatedTask, task.id); // Submit the updated task object
    setTask(initialValues); // Reset the form

    if (props.toggleForm) {
      props.toggleForm((prevState) => !prevState);
    }
  }

  return (
    <form id="task-form" name="taskForm" onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">Task Title: </label>
      <input
        type="text"
        id="task-title"
        name="taskTitle"
        value={task.taskTitle}
        onChange={handleChange}
        placeholder="Enter Title"
      />

      <label htmlFor="taskDetails">Task Details: </label>
      <input
        type="text"
        id="task-details"
        name="taskDetails"
        value={task.taskDetails}
        onChange={handleChange}
        placeholder="Enter Description"
      />

      <label htmlFor="taskTodos">Task Todo Items: </label>
      <textarea
        id="task-todos"
        name="taskTodos"
        value={task.taskTodos}
        onChange={handleChange}
        placeholder="Enter Todo Items"
      />

      {/* Employee Assignment */}
      <label htmlFor="assignedEmployee">Assign Task: </label>
      <select
        id="assigned-employee"
        name="assignedId" // Use the employee's ID as the value
        value={task.assignedId}
        onChange={handleChange}>
        <option value="">Select An Employee</option>
        {context.employees.map((employee) => (
          <option value={employee._id} key={employee._id}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>

      {/* Task Completed Checkbox */}
      <label htmlFor="taskCompleted">Task Completed: </label>
      <input
        type="checkbox"
        id="task-completed"
        name="taskCompleted"
        checked={task.taskCompleted} // Checkbox uses checked, not value
        onChange={handleChange}
      />

      <button type="submit" id="add-task-button">
        {props.buttonText}
      </button>
    </form>
  );
};

export default TaskForm;
