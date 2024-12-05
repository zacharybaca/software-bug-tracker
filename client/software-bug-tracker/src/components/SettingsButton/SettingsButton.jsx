import { Player } from "react-lottie";
import "./settings-button.css";
import settingsAnimation from "../../animations/settings-animation.json";


const SettingsButton = () => {
  return (
    <button>
      <Player autoplay loop src={settingsAnimation} style={lottieStyle} />
      Settings
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default SettingsButton;