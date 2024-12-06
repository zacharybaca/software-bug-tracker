import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import { TasksContext } from '../../context/tasksContext';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import UnAssignButton from "../UnAssignButton/UnAssignButton";


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
          <div id="main-task-container">
            <div className="task-item">
              <div className="task-info">
                <span className="heading">Title: </span>
                <span className="task-details">{props.title}</span>
              </div>
              <hr />
              <div className="task-info">
                <span className="heading">Details: </span>
                <span className="task-details">{props.details}</span>
              </div>
              <hr />
              <div id="todos-list" className="task-info">
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
              </div>
              <hr />
              <div className="task-info">
                <span className="heading">Completed: </span>
                <span className="task-details">
                  {props.completed && props.assignedEmployee ? "✅" : "❌"}
                </span>
              </div>
              <hr />
              <div className="task-info">
                <span className="heading">Assigned: </span>
                <span className="task-details">
                  {(() => {
                    const assignedEmployee = employees.employees.find(
                      (employee) => employee._id === props.assignedEmployee
                    );
                    return assignedEmployee
                      ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}`
                      : "Not Assigned";
                  })()}
                </span>
              </div>
            </div>
            <div id="buttons-container">
              <EditButton setShowForm={setShowForm}/>
              {/* <button
                type="button"
                id="edit-task-button"
                onClick={() => setShowForm((prevState) => !prevState)}>
                Edit
              </button> */}
              <DeleteButton deleteTask={props.deleteTask} id={props.id} />
              {/* <button
                type="button"
                id="delete-task-button"
                onClick={() => props.deleteTask(props.id)}>
                Delete
              </button> */}
              {props.assignedEmployee ? (
                <UnAssignButton unAssignTask={tasks.unAssignTask} id={props.id}/>
                // <button
                //   type="button"
                //   id="unassign-task-button"
                //   onClick={() => tasks.unAssignTask(props.id)}>
                //   Un-Assign Task
                // </button>
              ) : null}
            </div>
            {props.errMsg ? <p style={{ color: "red" }}>{props.errMsg}</p> : ""}
          </div>
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
