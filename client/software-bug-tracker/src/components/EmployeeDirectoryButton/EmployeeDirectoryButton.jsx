import Lottie from "react-lottie";
import "./employee-directory-button.css";
import employeeDirectoryAnimation from "../../animations/employee-directory-animation.json";

const EmployeeDirectoryButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: employeeDirectoryAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="employee-directory-button" className="glow-on-entry" onClick={() => {
      props.navigate("/employee-directory");
      props.setShowMenu(!props.showMenu);
    }}>
      <div className="employee-directory-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Employee Directory</span>
      </div>
    </button>
  );
};

export default EmployeeDirectoryButton;
