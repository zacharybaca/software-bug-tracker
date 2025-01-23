import './task-todo-items.css';


const TaskTodoItems = ({ taskTodos, handleChange }) => {
    return (
        <div>
            <label htmlFor="task-todos">Task Todo Items: </label>
            <textarea
                id="task-todos"
                name="taskTodos"
                value={taskTodos}
                onChange={handleChange}
                placeholder="Enter Each Todo Item Followed By a Period"
            />
        </div>
    )
}

export default TaskTodoItems;
