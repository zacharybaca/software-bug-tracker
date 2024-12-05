import { Player } from "react-lottie";
import './employee-directory-button.css';
import employeeDirectoryAnimation from "../../animations/employee-directory-animation.json";

const EmployeeDirectoryButton = () => {
  return (
    <button id="employee-directory-button">
      <Player autoplay loop src={employeeDirectoryAnimation} style={lottieStyle} />
      Employee Directory
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default EmployeeDirectoryButton;