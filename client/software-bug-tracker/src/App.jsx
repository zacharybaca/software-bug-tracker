import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import { TasksContextProvider } from './context/tasksContext';
import { EmployeesContextProvider } from './context/employeesContext';
import './App.css'

function App() {
  

  return (
    <div id="app-container">
      <TasksContextProvider>
        <TaskForm buttonText={"Add Task"} />
        <TaskList />
      </TasksContextProvider>
      {/* <EmployeesContextProvider>
        <EmployeeForm buttonText={"Add Employee"} />
      </EmployeesContextProvider> */}
    </div>
  );
}

export default App
