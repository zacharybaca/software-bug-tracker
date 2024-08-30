import './task-list.css';
import Task from '../Task/Task';
import {TasksContextProvider} from "../../context/tasksContext";


const TaskList = () => {
    return (
      <ul id="task-list">
        <TasksContextProvider>
          <Task />
        </TasksContextProvider>
      </ul>
    );
}

export default TaskList;