import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import React from 'react';

const Task = (props) => {
    const [showForm, setShowForm] = React.useState(false);
    
    return (
      <>
        {!showForm ? (
          <>
            <li className="task">
              <h1>
                <span className="heading">Title: </span>
                {props.title}
              </h1>
              <h2>
                <span className="heading">Details: </span>
                {props.details}
              </h2>
              <h2>
                <span className="heading">Todos: </span>
                {props.todos}
              </h2>
              <h3>
                <span className="heading">Completed: </span>
                {props.completed ? "✅" : "❌"}
              </h3>
              <h3>
                <span className="heading">Assigned: </span>
                {!props.assigned ? "Not Assigned" : props.assigned}
              </h3>
            </li>
            <div id="buttons-container">
              <button
                type="button"
                onClick={() => setShowForm((prevState) => !prevState)}>
                Edit
              </button>
              <button type="button">Delete</button>
            </div>
            <hr />
          </>
        ) : (
          <>
            <TaskForm
              buttonText="Update"
              id={props._id}
              taskTitle={props.title}
              taskCompleted={props.completed}
              taskDetails={props.details}
              taskTodos={props.todos}
              assignedEmployee={props.assigned}
              toggleForm={setShowForm}
            />
            <button
              type="button"
              onClick={() => setShowForm((prevState) => !prevState)}>
              Close
            </button>
          </>
        )}
      </>
    );
}

export default Task;