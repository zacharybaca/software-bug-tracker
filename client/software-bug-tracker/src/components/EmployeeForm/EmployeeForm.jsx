/* eslint-disable react-hooks/exhaustive-deps */
import './employee-form.css';
import React from 'react';
import { EmployeesContext } from '../../context/employeesContext';


function EmployeeForm(props) {
  const context = React.useContext(EmployeesContext);

  const initialValues = {
    firstName: props.firstName || "",
    lastName: props.lastName || "",
    roleAtCompany: props.roleAtCompany || "",
    user: {
      userID: props.userID || "",
      password: props.password || "",
      associatedEmployee: props.associatedEmployee || ""
    },
    avatar: props.avatar || "/uploads/default-profile-pic.jpg",
    generateAccessCode: false,
    accessCode: props.accessCode || "",
    isAdmin: props.isAdmin || props.roleAtCompany === "manager",
  };

  const [employee, setEmployee] = React.useState(initialValues);

  React.useEffect(() => {
    setEmployee({
      ...initialValues,
      avatar: props.avatar || "/uploads/default-profile-pic.jpg",
    });
  }, [props]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (employee.avatar instanceof File) {
        // Ensure avatar is a file before uploading
        const formData = new FormData();
        formData.append("avatar", employee.avatar);

        try {
          const response = await fetch(`/api/employees/${props.employeeID}`, {
            method: "PUT",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Unable to upload file");
          }

          const data = await response.json();
          console.log("Data:", data);

          setEmployee((prevState) => ({
            ...prevState,
            avatar: data.avatar, // Update state with the uploaded file's URL
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    fetchData();
  }, [employee.avatar, props.employeeID]);



  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: files[0], // Directly store the file object
      }));
    } else if (name === "roleAtCompany" && value === "manager") {
      setEmployee((prevState) => ({
        ...prevState,
        roleAtCompany: value,
        isAdmin: true,
      }));
    } else if (name === "userID" || name === "password") {
      setEmployee((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value,
        },
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // If buttonText is "Add Employee", then add employee, else update employee
    if (props.bttnText !== "Update") {
      const addProcess = async () => {
        try {
          context.addEmployee(employee); // Ensure this updates the global context
        } catch (error) {
          console.error("Error adding employee:", error);
        }
      };

      addProcess();
    }
    else {
    const updateProcess = async () => {
      try {
        context.updateEmployee(employee, props.employeeID); // Ensure this updates the global context
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };

    updateProcess();
    setEmployee(initialValues);
  };
    if (props.toggleForm) {
      props.toggleForm((prevState) => !prevState);
    }
  }


  return (
    <div id="employee-form-wrapper">
      <h1 id="add-employee-title">{props.formHeading ? props.formHeading : "Add Employee"}</h1>
      <form id="employee-form" name="employeeForm" onSubmit={handleSubmit}>
        <label htmlFor="employee-first-name">Employee First Name: </label>
        <input
          type="text"
          id="employee-first-name"
          name="firstName"
          onChange={handleChange}
          value={employee.firstName}
          required
          placeholder="Enter Employee's First Name"
        />
        <label htmlFor="employee-last-name">Employee Last Name: </label>
        <input
          type="text"
          id="employee-last-name"
          name="lastName"
          onChange={handleChange}
          value={employee.lastName}
          required
          placeholder="Enter Employee's Last Name"
        />
        {employee.accessCode ? (
          <>
            <label htmlFor="employee-userid">Employee UserID: </label>
            <input
              type="text"
              id="employee-userid"
              name="userID"
              onChange={handleChange}
              value={employee.user.userID}
            />
            <label htmlFor="employee-password">Employee Password: </label>
            <input
              type="password"
              id="employee-password"
              name="password"
              onChange={handleChange}
              value={employee.user.password}
            />
          </>
        ) : (
          ""
        )}
        <label htmlFor="employee-role">Assign Employee Role: </label>
        <select
          id="employee-role"
          name="roleAtCompany"
          onChange={handleChange}
          value={employee.roleAtCompany}
          disabled={!employee.firstName || !employee.lastName}
          required>
          <option disabled>Select A Role</option>
          <option value="softwareEngineer">Software Engineer I</option>
          <option value="softwareEngineer2">Software Engineer II</option>
          <option value="uxSpecialist">UX Specialist</option>
          <option value="manager">Manager</option>
        </select>
        <span id="admin-label">
          Does Employee Have Admin Rights?{" "}
          {employee.roleAtCompany === "manager" ? "✅" : "❌"}
        </span>
        <label htmlFor="generateAccessCode" id="generate-access-code-label">Generate Access Code?</label>
        <input
          type="checkbox"
          id="generateAccessCode"
          name="generateAccessCode"
          checked={employee.generateAccessCode}
          onChange={handleChange}
        />
        {context.userState?.accessCode && (
          <div id="access-code-container"><p>Access Code: {context.userState.accessCode}</p></div>
        )}
        {employee.user.userID ? (
          <div id="profile-pic-and-upload-container">

            <div id="avatar-pic">
              <img src={employee.avatar || "/uploads/default-profile-pic.jpg"} />
            </div>

            <div id="upload-container">
              {props.avatarUrl ? (
                <label htmlFor="avatar">Update Your Profile Image</label>
              ) : (
                <label htmlFor="avatar">Upload A Profile Image</label>
              )}
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>
        ) : null}
        <button type="submit" id="add-employee-button" className="glow-on-arrival" disabled={!employee.roleAtCompany}>
          {props.bttnText || "Add Employee"}
        </button>
        {props.bttnText ? <button type="button" id="close-update-button" className="glow-on-arrival" onClick={() => props.setShowForm((prevState) => !prevState)}>Close</button> : null}
      </form>
    </div>
  );
}

export default EmployeeForm;
