import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import { TasksContext } from '../../context/tasksContext';


const Task = (props) => {
    const [showForm, setShowForm] = React.useState(false);
    const [completedTodos, setCompletedTodos] = React.useState(
      new Array(props.todos.split("\n").length).fill(false)
    );
    const employees = React.useContext(EmployeesContext);
    const tasks = React.useContext(TasksContext);

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
              <h2 id="todos-list">
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
                {props.completed && props.assignedEmployee ? "✅" : "❌"}
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
              {props.assignedEmployee ? <button type="button" id="unassign-task-button" onClick={() => tasks.unAssignTask(props.id)}>
                Un-Assign Task
              </button> : null}
            </div>
            {props.errMsg ? <p style={{color: "red"}}>{props.errMsg}</p> : ""}
          </>
        ) : (
          <>
            <TaskForm
              buttonText="Update"
              id={props.id}
              title={props.title}
              completed={props.completed}
              details={props.details}
              todos={props.todos}
              assignedEmployee={props.assignedEmployee}
              toggleForm={setShowForm}
              submitTask={props.editTask}
            />
            <button
              type="button"
              id="close-update-button"
              onClick={() => setShowForm((prevState) => !prevState)}>
              Close
            </button>
          </>
        )}
      </>
    );
}

export default Task;
