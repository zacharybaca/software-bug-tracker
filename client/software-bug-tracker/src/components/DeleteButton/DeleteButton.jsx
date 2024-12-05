import { Player } from "react-lottie";
import './delete-button.css';
import deleteAnimation from "../../animations/delete-animation.json";

const DeleteButton = () => {
  return (
    <button>
      <Player autoplay loop src={deleteAnimation} style={lottieStyle} />
      Remove Employee
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default DeleteButton;