import './task-form.css';
import React from 'react';

const TaskForm = (props) => {
  // State Responsible For Individual Tasks
  const initialValues = {
    taskTitle: props.taskTitle || "",
    taskCompleted: props.taskCompleted || false,
    taskDetails: props.taskDetails || "",
    taskTodos: props.taskTodos || "",
    assignedEmployee: props.assignedEmployee || "",
  };

  const [task, setTask] = React.useState(initialValues);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setTask((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submitTask(task, task._id);
    setTask(initialValues);
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
      <label htmlFor="assignedEmployee">Assign Task: </label>
      <select id="assigned-employee" name="assignedEmployee" value={task.assignedEmployee} onChange={handleChange}>
        <option defaultValue>Select An Employee</option>
      </select>
      <label htmlFor="taskCompleted">Task Completed: </label>
      <input type="checkbox" id="task-completed" name="taskCompleted" checked={task.taskCompleted} value={task.taskCompleted.checked} onChange={handleChange}/>
      <button type="submit" id="add-task-button">
        {props.buttonText}
      </button>
    </form>
  );
}

export default TaskForm;