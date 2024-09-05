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
            addEmployee: addEmployee
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export { EmployeesContext, EmployeesContextProvider }
