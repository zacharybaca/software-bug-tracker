import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import { TasksContext } from '../../context/tasksContext';
import React from 'react';

const Task = (props) => {
    const [showForm, setShowForm] = React.useState(false);
    const context = React.useContext(TasksContext);
    return (
        <>
        {!showForm ? <>
        <li className="task">
            <h1>{props.title}</h1>
            <h2>{props.details}</h2>
            <h2>{props.todos}</h2>
            <h3>{props.completed}</h3>
            <h3>{props.assigned}</h3>
        </li>
        </>
        : <><TaskForm buttonText="Update" submitTask={context.addTask} id={props._id} taskTitle={props.taskTitle} taskCompleted={props.taskCompleted} taskDetails={props.taskDetails} taskTodos={props.taskTodos} assignedEmployee={props.assignedEmployee} toggleForm={setShowForm}/><button type="button" onClick={() => setShowForm(prevState => !prevState)}>Close</button></>
        }
        </>
    )
}

export default Task;