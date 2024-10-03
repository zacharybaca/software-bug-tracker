/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { EmployeesContext } from "./employeesContext";

const TasksContext = React.createContext();

function TasksContextProvider(props) {
  const context = React.useContext(EmployeesContext);

  // State Responsible For All Tasks
  const [tasks, setTasks] = useState([]);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const loggedInEmployee = context.getLoggedInEmployee();

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No Token Present");
    return token;
  };

  const addTask = async (newTask) => {
    try {
      const token = getToken();

      const response = await fetch("/api/main/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} : ${await response.text()}`
        );
      }

      const data = await response.json();
      const hasUserID = context.hasUserID(data.assignedEmployee);

      if (!hasUserID) {
        throw new Error(
          `${data.assignedEmployee} Does Not Have a User ID Associated With It.`
        );
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

      const response = await fetch(`/api/main/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} : ${await response.text()}`
        );
      }

      const data = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id !== id ? task : { ...data }))
      );
      setUnassignedTasks((prevTasks) =>
        prevTasks.map((task) => (task._id !== id ? task : { ...data }))
      );
    } catch (error) {
      console.error("Error: ", error);
      context.handleAuthErr(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = getToken();

      const response = await fetch(`/api/main/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} : ${await response.text()}`
        );
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setUnassignedTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
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
        throw new Error(
          `${response.status} ${response.statusText} : ${await response.text()}`
        );
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      context.handleAuthErr(error);
    }
  }, [loggedInEmployee]);

  const getUnassignedTasks = async () => {
    try {
      const token = getToken();

      const res = await fetch("/api/main/tasks/unassigned-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          `${res.status} ${res.statusText} : ${await res.text()}`
        );
      }

      const data = await res.json();
      setUnassignedTasks(data);
    } catch (error) {
      console.error("Error fetching unassigned tasks:", error);
      context.handleAuthErr(error);
    }
  };

  const getCompletedTasks = async () => {
    try {
      const token = getToken();

      const res = await fetch(
        "/api/main/tasks/taskCompleted?taskCompleted=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          `${res.status} ${res.statusText} : ${await res.text()}`
        );
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

      const res = await fetch(
        "api/main/tasks/taskCompleted?taskCompleted=false",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          `${res.status} ${res.statusText} : ${await res.text()}`
        );
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      context.handleAuthErr(error);
    }
  };

  const getTaskCounts = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.taskCompleted).length;
    const incompleteTasks = tasks.filter((task) => !task.taskCompleted).length;

    return { completed: completedTasks, incomplete: incompleteTasks };
  }, [tasks]);

  useEffect(() => {
    if (loggedInEmployee) {
      getTasks();
      getUnassignedTasks();
    }
  }, [loggedInEmployee, getTasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        unassignedTasks,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
        completed: getCompletedTasks,
        incomplete: getIncompleteTasks,
        getTaskCounts,
        getUnassignedTasks,
      }}>
      {props.children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksContextProvider };
