import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';


const Task = (props) => {
    const [showForm, setShowForm] = React.useState(false);
    const [completedTodos, setCompletedTodos] = React.useState(
      new Array(props.todos.split("\n").length).fill(false)
    );
    const employees = React.useContext(EmployeesContext);
    

    return (
      <>
        {!showForm ? (
          <>
            <div className="task">
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
                {props.todos.split("\n").map((line, index) => (
                  <p
                    style={
                      completedTodos[index]
                        ? { textDecoration: "line-through" }
                        : {}
                    }
                    key={index}
                    onClick={() => {
                      setCompletedTodos((prevState) => {
                        const updatedTodos = [...prevState];
                        updatedTodos[index] = !updatedTodos[index]; // Toggle the specific todo's completion
                        return updatedTodos;
                      });
                    }}>
                    {line}
                  </p>
                ))}
              </h2>
              <h3>
                <span className="heading">Completed: </span>
                {props.completed ? "✅" : "❌"}
              </h3>
              <h3>
                <span className="heading">Assigned: </span>
                {(() => {
                  const assignedEmployee = employees.employees.find(
                    (employee) => employee._id === props.assignedEmployee
                  );
                  return assignedEmployee
                    ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
                    : "Not Assigned";
                })()}
              </h3>
            </div>
            <div id="buttons-container">
              <button
                type="button"
                id="edit-task-button"
                onClick={() => setShowForm((prevState) => !prevState)}>
                Edit
              </button>
              <button type="button" id="delete-task-button" onClick={() => props.deleteTask(props.id)}>
                Delete
              </button>
            </div>
            {props.errMsg ? <p style={{color: "red"}}>{props.errMsg}</p> : ""}
          </>
        ) : (
          <>
            <TaskForm
              buttonText="Update"
              id={props.id}
              taskTitle={props.title}
              taskCompleted={props.completed}
              taskDetails={props.details}
              taskTodos={props.todos}
              assignedEmployee={props.assignedEmployee}
              toggleForm={setShowForm}
              submitTask={props.editTask}
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
