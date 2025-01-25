import Lottie from "react-lottie";
import logOutAnimation from "../../animations/logout-animation.json";
import "./log-out-button.css";

const LogOutButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: logOutAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="logout-button" className="glow-on-entry" onClick={() => {
      props.logout();
      props.setShowMenu(!props.showMenu);
    }}>
      <div className="logout-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Log Out</span>
      </div>
    </button>
  );
};

export default LogOutButton;
