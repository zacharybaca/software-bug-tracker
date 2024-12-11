import Lottie from "react-lottie";
import "./settings-button.css";
import settingsAnimation from '../../animations/settings-animation.json';

const SettingsButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: settingsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="my-settings-button">
      <div className="settings-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Settings</span>
      </div>
    </button>
  );
};

export default SettingsButton;
