import './task-form.css';


const TaskForm = (props) => {
    return (
        <form id="task-form" name="taskForm">
            <label htmlFor="taskTitle">Task Title: </label>
            <input type="text" id="task-title" name="taskTitle" placeholder="Enter Title" />
            <label htmlFor="taskDetails">Task Details: </label>
            <input type="text" id="task-details" name="taskDetails" placeholder="Enter Description" />
            <label htmlFor="taskTodos">Task Todo Items: </label>
            <textarea id="task-todos" name="taskTodos" placeholder="Enter Todo Items" />
            <label htmlFor="assignedEmployee">Assign Task: </label>
            <select id="assigned-employee" name="assignedEmployee">
                <option defaultValue>Select An Employee</option>
            </select>
            <label htmlFor="taskCompleted">Task Completed: </label>
            <input type="checkbox" id="task-completed" name="taskCompleted" />
            <button type="submit" id="add-task-button">{props.buttonText}</button>
        </form>
    )
}

export default TaskForm;