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
        const response = await fetch(`/api/employees/${employeeID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)
        })
        const data = await response.json();
        setEmployees(prevState => prevState.map(employee => employee._id === employeeID ? data : employee))
    }

    const createLoginAccount = (loginData, employeeID, accessToken) => {
        const foundEmployee = employees.find(employee => employee._id === employeeID);

        if (foundEmployee) {
            if (foundEmployee.accessCode) {
                if (foundEmployee.accessCode === accessToken) {
                   return updateEmployee(loginData, employeeID);
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
            const data = await fetch('/api/employees');
            const response = await data.json();
            setEmployees(response);
        }
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
