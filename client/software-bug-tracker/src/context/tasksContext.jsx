import React, { useEffect, useState } from 'react';

const TasksContext = React.createContext();

function TasksContextProvider(props) {

    // State Responsible For All Tasks
    const [tasks, setTasks] = useState([]);
    

    const addTask = async (newTask) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No Token Present");
            }

            const response = await fetch('/api/main/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newTask)
        })

         if (!response.ok) {
           throw new Error(
             `${response.status} ${
               response.statusText
             } : ${await response.text()}`
           );
         }
         
        const data = await response.json()

        setTasks(prevState => ([
            ...prevState,
            {
                ...data
            }
        ]))
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async (updatedTask, id) => {
        try {
            const response = await fetch(`/api/main/tasks/${id}`, {
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
            const response = await fetch(`/api/main/tasks/${id}`, {
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
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/main/tasks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`)
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
            console.error(error);
      }
    };

    const getCompletedTasks = async () => {
        try {
            const res = await fetch('/api/main/tasks/taskCompleted?taskCompleted=true');
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getIncompleteTasks = async () => {
        try {
             const res = await fetch('api/main/tasks/taskCompleted?taskCompleted=false');
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
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
