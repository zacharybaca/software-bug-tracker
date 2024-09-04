import React, { useEffect, useState } from 'react';

const TasksContext = React.createContext();



function TasksContextProvider(props) {

    // State Responsible For All Tasks
    const [tasks, setTasks] = useState([]);


    const addTask = async (newTask) => {
        try {
            const response = await fetch('/api/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
        const data = await response.json()

        setTasks(prevState => ([
            ...prevState,
            {
                ...data
            }
        ]))
        } catch {
            throw new Error("Failed To Add Task")
        }
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
            tasks: tasks,
            addTask: addTask
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export { TasksContext, TasksContextProvider }