import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

const EmployeesContext = React.createContext();

function EmployeesContextProvider(props) {
  // State Responsible For All Employees
  const [employees, setEmployees] = useState([]);

  // State Responsible For Tracking If a User is Logged In
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    tasks: [],
    errMsg: "",
    accessCode: ""
  };

  const [userState, setUserState] = useState(initialState);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No Token Present");
    return token;
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const findName = (username) => {
    const foundEmployee = employees.find(
      (employee) => employee.user?.userID === username
    );
    return foundEmployee
      ? `${foundEmployee.firstName} ${foundEmployee.lastName}`
      : undefined;
  };

  const findRoleAtCompany = (username) => {
    const foundEmployee = employees.find(
      (employee) => employee.user?.userID === username
    );
    return foundEmployee?.roleAtCompany || "Employee Does Not Exist";
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      const { _id, user, token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: _id, userID: user.userID })
      );

      setUserState((prevState) => ({
        ...prevState,
        user: { _id, userID: user.userID },
        token,
      }));
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const logout = async () => {
    const haveToken = getToken();
    try {
      if (haveToken) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("messageHistory");
        localStorage.removeItem("font");
        setUserState((prevUserState) => {
          return {
            ...prevUserState,
            token: "",
            user: {},
          };
        });
      }
      else {
        <Navigate to="/sign-up" />
      }
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const getLoggedInEmployee = () => {
    const loggedIn = JSON.parse(localStorage.getItem("user"));
    console.log('Logged In: ', employees.find((employee) => employee.user?.userID === loggedIn?.userID));
    const foundEmployee =  employees.find(
        (employee) => employee.user?.userID === loggedIn?.userID
      );
    if (foundEmployee) {
      return foundEmployee;
    }
    else {
      return null;
    }
  };

  const hasAdminRights = () => {
    const signedInEmployee = getLoggedInEmployee();
    if (signedInEmployee) {
      const roleAtCompany = findRoleAtCompany(signedInEmployee.user.userID);
      return roleAtCompany === "manager" ? "manager" : false;
    }
    return false;
  };

  const hasUserID = (id) => {
    const employee = employees.find((employee) => employee._id === id);
    return !!employee?.user?.userID;
  };

  const handleAuthErr = (errMsg) => {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  };

  const resetAuthErr = () => {
    setUserState((prevState) => ({ ...prevState, errMsg: "" }));
  };

  const addEmployee = async (newEmployee) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error(`Failed to add employee: ${response.statusText}`);
      }

      const data = await response.json();
      alert(`Employee's Access Code is: ${data.accessCode}`);

      setEmployees((prevState) => [...prevState, data]);
      setUserState((prevState) => ({
        ...prevState,
        accessCode: data.accessCode,
      }));
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const updateEmployee = async (updatedEmployee, employeeID) => {
    try {
      const token = getToken();
      const response = await fetch(`/api/employees/${employeeID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEmployee),
      });
  
      if (!response.ok) throw new Error(`Failed to update employee: ${response.statusText}`);
  
      await fetchEmployees(); // Refetch employees to update the state
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const assignEmployeeCredentials = async (updatedEmployee, employeeID, accessToken) => {
    try {
      const foundEmployee = employees.find((employee) => employee._id === employeeID);
  
      if (!foundEmployee) throw new Error("Employee Not Found");
      if (foundEmployee.accessCode !== accessToken) {
        throw new Error("Access Code is Incorrect. Please Try Again.");
      }
  
      if (foundEmployee.user?.userID) {
        const override = confirm(
          "An account already exists for this user. Override with new credentials?"
        );
        if (!override) return;
      }
  
      const response = await fetch(`/api/employees/${employeeID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update employee: ${response.statusText}`);
      }
  
      const data = await response.json();
      setEmployees((prevState) =>
        prevState.map((employee) => (employee._id !== employeeID ? employee : data))
      );
    } catch (error) {
      handleAuthErr(error.message);
    }
  };  

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`api/employees/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevState) =>
        prevState.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      handleAuthErr(error.message);
    }
  };

  const createLoginAccount = async (loginData, employeeID, accessToken) => {
    const employee = employees.find(employee => employee._id === employeeID);

    if (employee) {
      if (accessToken !== employee.accessCode) {
        throw new Error("The Access Code You Have Entered is Invalid");
      }
    }
    else {
      throw new Error("That Employee Does Not Exist in Our Database");
    }

    try {
      const formData = new FormData();
      Object.keys(loginData).forEach((key) => {
        if (key === "avatar" && loginData.avatar) {
          formData.append(key, loginData.avatar);
        } else {
          formData.append(key, loginData[key]);
        }
      });
  
      const response = await fetch(`/api/employees/${employeeID}`, {
        method: "PUT",
        body: formData,
      });
  
      if (!response.ok) throw new Error(`Failed to create login account: ${response.statusText}`);
  
      await fetchEmployees(); // Refetch employees to update the state
    } catch (error) {
      handleAuthErr(error.message);
    }
  };
  
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        handleAuthErr(error.message);
      }
    };
    getEmployees();
  }, []);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        assignEmployeeCredentials,
        deleteEmployee,
        getLoggedInEmployee,
        createLoginAccount,
        hasAdminRights,
        hasUserID,
        findRoleAtCompany,
        login,
        logout,
        findName,
        handleAuthErr,
        resetAuthErr,
        userState,
      }}>
      {props.children}
    </EmployeesContext.Provider>
  );
}

export { EmployeesContext, EmployeesContextProvider };
