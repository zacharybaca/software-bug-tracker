import { Player } from "react-lottie";
import "./un-assign-button.css";
import unAssignAnimation from "../../animations/unassign-animation.json";

const UnAssignButton = () => {
  return (
    <button id="unassigned-tasks-button">
      <Player autoplay loop src={unAssignAnimation} style={lottieStyle} />
      
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default UnAssignButton;