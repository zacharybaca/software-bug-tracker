import React, { useEffect, useState } from 'react';


const EmployeesContext = React.createContext();


function EmployeesContextProvider(props) {

    

    // State Responsible For All Employees
    const [employees, setEmployees] = useState([]);

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

        } catch {
            throw new Error("Failed To Add New Employee")
        }
    }


    const updateEmployee = async (updatedEmployee, employeeID) => {
      console.log("Sending Data:", updatedEmployee); // Add this to see what's being sent
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
        console.log("User: ", data);
        setEmployees((prevState) =>
          prevState.map((employee) =>
            employee._id !== employeeID ? employee : { ...data }
          )
        );
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };


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
            createLogin: createLoginAccount
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export { EmployeesContext, EmployeesContextProvider }
