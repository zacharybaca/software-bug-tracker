import './task-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';



const TaskForm = (props) => {
  const context = React.useContext(EmployeesContext);
    console.log('Context: ', context);
  // State Responsible For Individual Tasks
  const initialValues = {
    id: props.id || "",
    taskTitle: props.taskTitle || "",
    taskCompleted: props.taskCompleted || false,
    taskDetails: props.taskDetails || "",
    taskTodos: props.taskTodos || "",
    assignedId: props.assignedId || "",
    assignedEmployee: props.assignedEmployee || ""
  };
  console.log('Initial Values: ', initialValues);
  const [task, setTask] = React.useState(initialValues);

  function handleChange(e) {
    console.log('Handle Function Values: ', e.target.name, e.target.value);
    const { name, value, type, checked } = e.target;
    
    setTask((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Format the taskTodos field before submitting
    const formattedTodos = task.taskTodos
      .split(".")
      .map((todo) => todo.trim())
      .filter((todo) => todo)
      .join(".\n");
    
    setTask(prevState => ({
      ...prevState,
      taskTodos: formattedTodos
    }));

    props.submitTask(task, task.id);
    console.log('Task: ', task.id)
    setTask(initialValues);

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
      <label htmlFor="assignedEmployee">Assign Task: </label>
      <select id="assigned-employee" name="assignedEmployee" value={task.assignedEmployee} onChange={handleChange}>
        <option value="">Select An Employee</option>
        {context.employees.map(employee => (
          <option value={employee._id} key={employee._id}>{employee.firstName} {employee.lastName}</option>
        ))}
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
