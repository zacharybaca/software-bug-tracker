/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { EmployeesContext } from './employeesContext';

const TasksContext = React.createContext();

function TasksContextProvider(props) {
    const context = React.useContext(EmployeesContext);
    // State Responsible For All Tasks
    const [tasks, setTasks] = useState([]);
    const loggedInEmployee = context.getLoggedInEmployee();
    const getToken = () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No Token Present");
      return token;
    };


    const addTask = async (newTask) => {
        try {

            const token = getToken();

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

           const token = getToken();

            const response = await fetch(`/api/main/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok) {
              throw new Error(
                `${response.status} ${
                  response.statusText
                } : ${await response.text()}`
              );
            }

            const data = await response.json();
            setTasks(prevTasks => prevTasks.map((task => task._id !== id ? task : {...data})))
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const deleteTask = async (id) => {
        try {

           const token = getToken();

            const response = await fetch(`/api/main/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

           if (!response.ok) {
             throw new Error(
               `${response.status} ${
                 response.statusText
               } : ${await response.text()}`
             );
           }

            setTasks(prevTasks => prevTasks.filter(task => task._id !== id))
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const getTasks = useCallback(async () => {
      try {
        const token = getToken();
        if (!token || !loggedInEmployee) {
          return;
        }

        console.log("Fetching tasks...");

        const response = await fetch("/api/main/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `${response.status} ${
              response.statusText
            } : ${await response.text()}`
          );
        }

        const data = await response.json();
        console.log("Tasks fetched:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }, [loggedInEmployee]); 

    const getCompletedTasks = async () => {
        try {
           const token = getToken();

            const res = await fetch('/api/main/tasks/taskCompleted?taskCompleted=true', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
              throw new Error(
                `${res.status} ${
                  res.statusText
                } : ${await res.text()}`
              );
            }

            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getIncompleteTasks = async () => {
        try {
          const token = getToken();


             const res = await fetch('api/main/tasks/taskCompleted?taskCompleted=false', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
             });

             if (!res.ok) {
               throw new Error(
                 `${res.status} ${
                   res.statusText
                 } : ${await res.text()}`
               );
             }

            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getTaskCounts = useMemo(() => {
      const completedTasks = tasks.filter((task) => task.taskCompleted).length;
      const incompleteTasks = tasks.filter(
        (task) => !task.taskCompleted
      ).length;

      return { completed: completedTasks, incomplete: incompleteTasks };
    }, [tasks]);



     useEffect(() => {
       if (loggedInEmployee) {
         getTasks();
       }
     }, [loggedInEmployee, getTasks]);

    return (
        <TasksContext.Provider value={{
            tasks: tasks,
            getTasks: getTasks,
            addTask: addTask,
            deleteTask: deleteTask,
            updateTask: updateTask,
            completed: getCompletedTasks,
            incomplete: getIncompleteTasks,
            getTaskCounts: getTaskCounts
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export { TasksContext, TasksContextProvider }
