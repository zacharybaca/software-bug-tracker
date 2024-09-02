import './task-form.css';


const TaskForm = () => {
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
            <labl htmlFor="taskCompleted">Task Completed: </labl>
            <input type="checkbox" id="task-completed" name="taskCompleted" />
        </form>
    )
}

export default TaskForm;