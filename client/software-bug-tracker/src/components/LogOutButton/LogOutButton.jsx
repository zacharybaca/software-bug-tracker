import { Player } from "react-lottie";
import logOutAnimation from '../../animations/logout-animation.json';
import "./log-out-button.css";

const LogOutButton = () => {

  return (
    <button id="logout-button">
      <Player
        autoplay
        loop
        src={logOutAnimation}
        style={lottieStyle} 
      />
      Log Out
    </button> 
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default LogOutButton;