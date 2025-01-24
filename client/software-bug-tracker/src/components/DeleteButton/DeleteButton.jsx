import Lottie from "react-lottie";
import "./delete-button.css";
import deleteAnimation from "../../animations/delete-animation.json";

const DeleteButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: deleteAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const isConfirmed = () => {
    if (props.confirmation) {
      props.deleteTask(props.id);
    }
    else {
      return false;
    }
  };

  return (
    <button id="delete-task-button" onClick={isConfirmed}>
      <div className="delete-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Delete</span>
      </div>
    </button>
  );
};

export default DeleteButton;
