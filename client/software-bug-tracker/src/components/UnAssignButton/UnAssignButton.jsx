import Lottie from "react-lottie";
import "./un-assign-button.css";
import unAssignAnimation from "../../animations/unassign-animation.json";

const UnAssignButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: unAssignAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="unassign-task-button" onClick={() => props.unAssignTask(props.id)}>
      <div className="unassign-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>UnAssign</span>
      </div>
    </button>
  );
};

export default UnAssignButton;