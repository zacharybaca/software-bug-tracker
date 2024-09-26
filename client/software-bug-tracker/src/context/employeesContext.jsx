import React, { useEffect, useState } from 'react';



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
    }

    const [userState, setUserState] = useState(initialState);

    const findName = (username) => {
      const foundEmployee = employees.find(employee => employee.user.userID === username);

      if (foundEmployee) {
        return `${foundEmployee.firstName} ${foundEmployee.lastName}`
      }
    }

    const findRoleAtCompany = (username) => {
      const foundEmployee = employees.find(employee => employee.user.userID === username);

      if (foundEmployee) {
        return foundEmployee.roleAtCompany;
      }

      return "Employee Does Not Exist";
    }

    const login = async (credentials) => {
      try {
        const response = await fetch('/api/employees/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })
        const data = await response.json();
        const {_id, user, token} = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ _id: _id, userID: user.userID }));
        setUserState(prevState => ({
          ...prevState,
          user: { _id: user._id, userID: user.userID },
          token: token
        }))
      } catch (error) {
        handleAuthErr(error.response.data.errMsg);
      }
    }

    const logout = async () => {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUserState(prevState => ({
          ...prevState,
          token: "",
          user: {}
        }))
      } catch (error) {
        handleAuthErr(error.response.data.errMsg);
      }
    }

    const getLoggedInEmployee = () => {
      const loggedIn = JSON.parse(localStorage.getItem("user"));
      console.log("Logged In: ", loggedIn);

      const loggedInEmployee = employees.find(
        (employee) => employee.user.userID === loggedIn.userID
      );

      return loggedInEmployee;
    }

    const hasAdminRights = () => {
      const signedInEmployee = getLoggedInEmployee();
      return signedInEmployee.isAdmin;
    }

    const handleAuthErr = (errMsg) => {
      setUserState(prevState => ({
        ...prevState,
        errMsg
      }))
    }

    const resetAuthErr = () => {
      setUserState(prevState => ({
        ...prevState,
        errMsg: ""
      }))
    }

    const addEmployee = async (newEmployee) => {
        try {
            const response = await fetch('/api/employees', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        })
        const data = await response.json()

        alert(`Employee's Access Code is: ${data.accessCode}`)

        setUserState(prevState => ({
          ...prevState,
          accessCode: data.accessCode
        }))
        
        setEmployees(prevState => ([
            ...prevState,
            {
                ...data
            }
        ]))

        } catch (error) {
            handleAuthErr(error.response.data.errMsg);
        }
    }


    const updateEmployee = async (updatedEmployee, employeeID) => {
      try {
        const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage
        const response = await fetch(`/api/employees/${employeeID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add the token in the Authorization header
          },
          body: JSON.stringify(updatedEmployee),
        });
        console.log('Updated Employee: ', updatedEmployee);
        
        if (!response.ok) {
          handleAuthErr(response.statusText);
          console.log(response.statusText);
        }
    
        const data = await response.json();
        setEmployees((prevState) =>
          prevState.map((employee) =>
            employee._id !== employeeID ? employee : { ...data }
          )
        );
      } catch (error) {
        handleAuthErr(error.response?.data?.errMsg || error.message);
        console.log(error.response?.data?.errMsg || error.message);
      }
    };
    

    const updateEmployeeProfile = async (updatedEmployee, id) => {
      try {
        const response = await fetch(`/api/employees/employee/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedEmployee)
        });

        if (!response.ok) {
          throw new Error(`Failed to Update Employee Profile: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees((prevState) =>
          prevState.map((employee) =>
            employee._id !== id ? employee : { ...data }
          )
        );
      } catch (error) {
        handleAuthErr(error.response.data.errMsg);
      }
    }

    const deleteEmployee = async (id) => {
      try {
        const response = await fetch(`api/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        if (!response.ok) {
          throw new Error ('Failed to delete Employee')
        }

        setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
      } catch (error) {
        handleAuthErr(error.response.data.errMsg);
      }
    }


    const createLoginAccount = (loginData, employeeID, accessToken) => {
        const foundEmployee = employees.find(employee => employee._id === employeeID);

        if (foundEmployee) {
            if (foundEmployee.accessCode) {
                if (foundEmployee.accessCode === accessToken) {
                   updateEmployee(loginData, foundEmployee._id)
                } else {
                    throw new Error("Access Code is Incorrect. Please Try Again.");
                }
            } else {
                throw new Error("Employee Does Not Have Access To Create An Account. Contact A Manager To Set Up.");
            }
        } else {
            throw new Error("Employee ID Does Not Exist");
        }
    }

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
           handleAuthErr(error.response.data.errMsg);
         }
       };
        getEmployees();
    }, [])

    return (
        <EmployeesContext.Provider value={{
            employees: employees,
            addEmployee: addEmployee,
            updateEmployee: updateEmployee,
            updateEmployeeProfile: updateEmployeeProfile,
            deleteEmployee: deleteEmployee,
            getLoggedInEmployee: getLoggedInEmployee,
            createLogin: createLoginAccount,
            hasAdminRights: hasAdminRights,
            findRoleAtCompany: findRoleAtCompany,
            login: login,
            logout: logout,
            findName: findName,
            handleAuthErr: handleAuthErr,
            resetAuthErr: resetAuthErr,
            userState: {...userState}
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export { EmployeesContext, EmployeesContextProvider }
