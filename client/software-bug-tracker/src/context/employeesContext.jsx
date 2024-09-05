import React, { useEffect, useState } from 'react';

const EmployeesContext = React.createContext();


function EmployeesContextProvider(props) {

    // State Responsible For Individual Employees
    const [employee, setEmployee] = useState({
        firstName: props.firstName || "",
        lastName: props.lastName || "",
        roleAtCompany: props.roleAtCompany || "",
        isAdmin: props.roleAtCompany === "manager"
    });

    // State Responsible For All Employees
    const [employees, setEmployees] = useState([]);

    function handleChange(e) {
        const {name, value, type, checked} = e.target;

        setEmployee(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
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
            employee: employee,
            employees: employees,
            handleChange: handleChange
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export { EmployeesContext, EmployeesContextProvider }
