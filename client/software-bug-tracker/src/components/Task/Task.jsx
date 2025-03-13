import './task.css';
import TaskForm from '../TaskForm/TaskForm';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import { TasksContext } from '../../context/tasksContext';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import UnAssignButton from "../UnAssignButton/UnAssignButton";
import TaskDetailImage from "../../assets/task-details.png";
import TaskTodoImage from "../../assets/todos.png";
import TaskTitleImage from "../../assets/task-title.png";


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
                <img src={TaskTitleImage} />
                <span className="heading">Title: </span>
                <span className="task-details">{props.title}</span>
              </div>

              <div className="task-info">
                <img src={TaskDetailImage} />
                <span className="heading">Details: </span>
                <span className="task-details">{props.details}</span>
              </div>

              <div id="todos-list" className="task-info">
                <img src={TaskTodoImage} />
                {props.todos.length > 0 ? <span className="heading">Todos: </span> : <span className="heading">No Todos Assigned to Task</span>}
                {props.todos.length > 0 && props.todos.split("\n").map((line, index) => (
                  <div key={index} className="todo-item">
                    <input
                      type="checkbox"
                      checked={completedTodos[index]}
                      onChange={() => {
                        setCompletedTodos((prevState) => {
                          const updatedTodos = [...prevState];
                          updatedTodos[index] = !updatedTodos[index]; // Toggle completion status
                          return updatedTodos;
                        });
                      }}
                    />
                    <label
                      style={
                        completedTodos[index]
                          ? { textDecoration: "line-through", cursor: "pointer" }
                          : { cursor: "pointer" }
                      }
                      onClick={() => {
                        setCompletedTodos((prevState) => {
                          const updatedTodos = [...prevState];
                          updatedTodos[index] = !updatedTodos[index]; // Toggle on label click too
                          return updatedTodos;
                        });
                      }}
                    >
                      {line}
                    </label>
                  </div>
                ))}
              </div>

              <div className="task-info">
                <span className="heading">Completed: </span>
                <span className="task-details">
                  {completedTodos.every((todo) => todo) && props.assignedEmployee ? "✅" : "❌"}
                </span>
              </div>

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
              <DeleteButton deleteTask={props.deleteTask} confirmation={props.proceed} handleQuestion={props.handleQuestion} id={props.id} />
              {props.assignedEmployee ? (
                <UnAssignButton unAssignTask={tasks.unAssignTask} confirmation={props.proceed} handleQuestion={props.handleQuestion} id={props.id} />
              ) : null}
            </div>
            {props.errMsg ? <p style={{ color: "red" }}>{props.errMsg}</p> : ""}
          </div>
        ) : (
          <div id="task-form-update-container">
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
              setShowForm={setShowForm}
              showForm={showForm}
              confirmation={props.proceed}
              errMsg={props.errMsg ? props.errMsg : employees.userState.errMsg}
            />
          </div>
        )}
      </>
    );
}

export default Task;
