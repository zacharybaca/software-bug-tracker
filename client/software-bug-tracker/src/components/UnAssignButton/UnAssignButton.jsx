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

  const isConfirmed = () => {
    props.handleQuestion("Are You Sure You Want to Un-Assign This Task?");
    if (props.confirmation) {
      props.unAssignTask(props.id);
    }
    else {
      return false;
    }
  };

  return (
    <button id="unassign-task-button" onClick={isConfirmed}>
      <div className="unassign-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>UnAssign</span>
      </div>
    </button>
  );
};

export default UnAssignButton;
