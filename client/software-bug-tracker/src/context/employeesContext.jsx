import React, { useEffect, useState } from 'react';


const EmployeesContext = React.createContext();


function EmployeesContextProvider(props) {

    

    // State Responsible For All Employees
    const [employees, setEmployees] = useState([]);

    // State Responsible For Tracking If a User is Logged In
    const initialState = {
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || "",
      tasks: []
    }

    const [userState, setUserState] = useState(initialState);

    const findName = (username) => {
      const foundEmployee = employees.find(employee => employee.user.userID === username);

      if (foundEmployee) {
        return `${foundEmployee.firstName} ${foundEmployee.lastName}`
      }
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
        const {user, token} = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState(prevState => ({
          ...prevState,
          user: user,
          token: token
        }))
      } catch (error) {
        console.log(error);
      }
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

        setEmployees(prevState => ([
            ...prevState,
            {
                ...data
            }
        ]))

        } catch (error) {
            throw new Error("Failed To Add New Employee", error)
        }
    }


    const updateEmployee = async (updatedEmployee, employeeID) => {
      try {
        const response = await fetch(`/api/employees/${employeeID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        });
        if (!response.ok) {
          throw new Error(`Failed to update employee: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees((prevState) =>
          prevState.map((employee) =>
            employee._id !== employeeID ? employee : { ...data }
          )
        );
      } catch (error) {
        console.error("Error updating employee:", error);
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
        console.error('Error Updating Employee Profile: ', error)
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
        console.error('Error: ', error);
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
           console.error("Failed to fetch employees:", error);
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
            createLogin: createLoginAccount,
            login: login,
            findName: findName,
            userState: {...userState}
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export { EmployeesContext, EmployeesContextProvider }
