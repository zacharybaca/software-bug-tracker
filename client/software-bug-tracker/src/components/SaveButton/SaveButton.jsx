import Lottie from "react-lottie";
import "./save-button.css";
import saveAnimation from "../../animations/save-animation.json";

const SaveButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: saveAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="my-save-button">
      <div className="save-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Save</span>
      </div>
    </button>
  );
};

export default SaveButton;
