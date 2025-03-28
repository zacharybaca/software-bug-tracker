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
    taskTodos: props.todos || [],
    assignedEmployee:
      (props.assignedEmployee && props.assignedEmployee._id) ||
      (context.getLoggedInEmployee() && context.getLoggedInEmployee()._id) ||
      "",
  };

  const [task, setTask] = React.useState(initialValues);

  // Handle input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "taskTodos") {
      const todosArray = value
        .split(".")
        .map((todo) => todo.trim())
        .filter((todo) => todo)
        .map((todo) => ({ description: todo, completed: false })); // Convert to objects

      setTask((prevState) => ({
        ...prevState,
        [name]: todosArray, // Store as an array of objects
      }));
    } else {
      setTask((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const updatedTask = {
      ...task,
      taskTodos: task.taskTodos.map((todo) => ({
        description: todo.description,
        completed: todo.completed || false,
      })), // Ensure todos are stored correctly
    };

    props.submitTask(updatedTask, task.id);

    // Wait for submitTask to complete before resetting
    setTimeout(() => setTask(initialValues), 100);

    if (props.toggleForm) {
      props.toggleForm((prevState) => !prevState);
      context.resetAuthErr();
    }
  }

  const assigned = React.useMemo(() => {
    return context.employees.find(
      (employee) => employee._id === task.assignedEmployee
    );
  }, [context.employees, task.assignedEmployee]);

  return (
    <form id="task-form" name="taskForm" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task Title: </label>
      <input
        type="text"
        id="task-title"
        name="taskTitle"
        value={task.taskTitle}
        onChange={handleChange}
        required
        placeholder="Enter Title"
      />

      <label htmlFor="task-details">Task Details: </label>
      <input
        type="text"
        id="task-details"
        name="taskDetails"
        value={task.taskDetails}
        onChange={handleChange}
        required
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
                {assigned && assigned.firstName && assigned.lastName
                  ? `${assigned.firstName} ${assigned.lastName}`
                  : "None"}
              </span>
            </h3>
        </>
      )}
      {/* Task Completed Checkbox */}
      <div id="checkbox-container">
        <label htmlFor="task-completed">Task Completed: </label>
        <input
          type="checkbox"
          id="task-completed"
          name="taskCompleted"
          checked={task.taskCompleted} // Checkbox uses checked, not value
          onChange={handleChange}
          disabled={!props.assignedEmployee}
          className={
            !props.assignedEmployee
              ? "disabled-task-complete"
              : "enabled-task-complete"
          }
        />
      </div>
      <button
        type="submit"
        id="add-task-button"
        disabled={!task.taskTitle || !task.taskDetails}>
        {props.buttonText}
      </button>
      {props.showForm ? <button type="button" id="close-task-update-button" onClick={() => props.setShowForm((prevState) => !prevState)}>Close</button> : null}
      {props.errMsg ? <p className="error-message">{props.errMsg}</p> : ""}
    </form>
  );
};

export default TaskForm;
