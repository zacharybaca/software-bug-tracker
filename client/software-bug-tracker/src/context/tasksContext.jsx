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

    const updateTask = async (updatedTask, id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            });

            const data = await response.json();
            setTasks(prevTasks => prevTasks.map((task => task._id !== id ? task : {...data})))
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Failed to Delete Task');
            }

            setTasks(prevTasks => prevTasks.filter(task => task._id !== id))
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const getTasks = async () => {
      const data = await fetch("/api/tasks");
      const response = await data.json();
      setTasks(response);
    };

    const getCompletedTasks = async () => {
        const res = await fetch('/api/tasks/taskCompleted?taskCompleted=true');
        const data = await res.json();
        setTasks(data);
    }

    const getIncompleteTasks = async () => {
        const res = await fetch('api/tasks/taskCompleted?taskCompleted=false');
        const data = await res.json();
        setTasks(data);
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <TasksContext.Provider value={{
            tasks: tasks,
            getTasks: getTasks,
            addTask: addTask,
            deleteTask: deleteTask,
            updateTask: updateTask,
            completed: getCompletedTasks,
            incomplete: getIncompleteTasks
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export { TasksContext, TasksContextProvider }
