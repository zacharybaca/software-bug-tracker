

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { EmployeesContext } from "./employeesContext";

const TasksContext = React.createContext();

function TasksContextProvider(props) {
  const context = React.useContext(EmployeesContext);

  const [tasks, setTasks] = useState([]);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const loggedInEmployee = context.getLoggedInEmployee();

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, please log in.");
      return null; // Return null instead of throwing an error
    }
    return token;
  };

  const addTask = async (newTask) => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const response = await fetch("/api/main/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
      }

      const data = await response.json();
      const hasUserID = context.hasUserID(data.assignedEmployee);
      
      if (!hasUserID && loggedInEmployee.isAdmin) {
        throw new Error(`${data.assignedEmployee} Does Not Have a User ID Associated With It.`);
      }

      if (data.assignedEmployee == null) {
        setUnassignedTasks((prevState) => [...prevState, { ...data }]);
      } else {
        setTasks((prevState) => [...prevState, { ...data }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (updatedTask, id) => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const response = await fetch(`/api/main/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
      }

      const data = await response.json();
      setTasks((prevTasks) => prevTasks.map((task) => (task._id !== id ? task : { ...data })));
      setUnassignedTasks((prevTasks) => prevTasks.map((task) => (task._id !== id ? task : { ...data })));

      await getTasks();
      await getUnassignedTasks();
    } catch (error) {
      console.error("Error: ", error);
      context.handleAuthErr(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const response = await fetch(`/api/main/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setUnassignedTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error: ", error);
      context.handleAuthErr(error);
    }
  };

  const getTasks = useCallback(async () => {
    try {
      const token = getToken();
      if (!token || !loggedInEmployee) {
        console.log("No token or logged-in employee present.");
        return false;
      }

      const response = await fetch("/api/main/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      context.handleAuthErr(error);
    }
  }, [loggedInEmployee]);

  const getUnassignedTasks = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const res = await fetch("/api/main/tasks/unassigned-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText} : ${await res.text()}`);
      }

      const data = await res.json();
      setUnassignedTasks(data);
    } catch (error) {
      console.error("Error fetching unassigned tasks:", error);
      context.handleAuthErr(error);
    }
  }, []);

  const getCompletedTasks = async () => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const res = await fetch("/api/main/tasks/taskCompleted?taskCompleted=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText} : ${await res.text()}`);
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      context.handleAuthErr(error);
    }
  };

  const getIncompleteTasks = async () => {
    try {
      const token = getToken();
      if (!token) return; // Early exit if no token

      const res = await fetch("/api/main/tasks/taskCompleted?taskCompleted=false", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText} : ${await res.text()}`);
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      context.handleAuthErr(error);
    }
  };

  const unAssignTask = async (id) => {
    try {
      const taskToUnassign = tasks.find((task) => task._id === id);

      if (!taskToUnassign) return;

      const updatedTask = {
        ...taskToUnassign,
        taskCompleted: false,
        assignedEmployee: null,
      };

      await updateTask(updatedTask, id);

      // Update local state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove task from tasks list
      setUnassignedTasks((prevUnassignedTasks) => [
        ...prevUnassignedTasks,
        updatedTask,
      ]); // Add task to unassignedTasks list
      // await getTasks(); // Refetch tasks
      // await getUnassignedTasks(); // Refetch unassigned tasks if needed
    } catch (error) {
      console.error("Error unassigning task:", error);
    }
  };

  const unAssignTasksForDeletedEmployee = async (employeeID) => {
    try {
      const tasksToUnassign = tasks.filter(
        (task) => task.assignedEmployee._id === employeeID
      );

      if (tasksToUnassign.length === 0) {
        return context.deleteEmployee(employeeID);
      }

      // Unassign all tasks and wait for all of them to complete
      await Promise.all(
        tasksToUnassign.map(async (task) => {
          await unAssignTask(task._id); // Ensure state gets updated for each task
        })
      );

      // Refetch tasks to ensure the state is fully updated
      await getTasks();
      await getUnassignedTasks();

      await context.deleteEmployee(employeeID);
    } catch (error) {
      console.error("Error unassigning tasks for deleted employee: ", error);
    }
  }

  const getTaskCounts = useMemo(() => {
    const completedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.taskCompleted).length : 0;
    const incompleteTasks = Array.isArray(tasks) ? tasks.filter((task) => !task.taskCompleted).length : 0;

    return { completed: completedTasks, incomplete: incompleteTasks };
  }, [tasks]);

  useEffect(() => {
    if (loggedInEmployee) {
      getTasks();
      getUnassignedTasks();
    }
  }, [loggedInEmployee]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        unassignedTasks,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
        unAssignTask,
        completed: getCompletedTasks,
        incomplete: getIncompleteTasks,
        getTaskCounts,
        getUnassignedTasks,
        unAssignTasksForDeletedEmployee
      }}>
      {props.children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksContextProvider };
