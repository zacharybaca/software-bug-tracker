import React, { useEffect, useState } from 'react';

const TasksContext = React.createContext();



function TasksContextProvider(props) {

    // State Responsible For Individual Tasks
    const [task, setTask] = useState({
        taskTitle: props.taskTitle || "",
        taskCompleted: props.taskCompleted || false,
        taskDetails: props.taskDetails || "",
        taskTodos: props.taskTodos || "",
        assignedEmployee: props.assignedEmployee || ""
    });

    // State Responsible For All Tasks
    const [tasks, setTasks] = useState([]);

    function handleChange(e) {
        const {name, value, type, checked} = e.target;

        setTask(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    useEffect(() => {
        const getTasks = async () => {
            const data = await fetch('/api/tasks');
            const response = await data.json();
            setTasks(response);
        }
        getTasks();
    }, [])

    return (
        <TasksContext.Provider value={{
            task: task,
            tasks: tasks,
            handleChange: handleChange
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export { TasksContext, TasksContextProvider }