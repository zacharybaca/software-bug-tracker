import { Player } from "react-lottie";
import "./edit-button.css";
import editAnimation from "../../animations/edit-animation.json";

const EditButton = () => {
  return (
    <button>
      <Player autoplay loop src={editAnimation} style={lottieStyle} />
      Edit
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default EditButton;
