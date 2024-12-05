import { Player } from "react-lottie";
import "./save-button.css";
import saveAnimation from "../../animations/save-animation.json";


const SaveButton = () => {
  return (
    <button>
      <Player autoplay loop src={saveAnimation} style={lottieStyle} />
      Save
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default SaveButton;