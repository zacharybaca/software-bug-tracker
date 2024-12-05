import Lottie from "react-lottie";
import "./edit-button.css";
import editAnimation from "../../animations/edit-animation.json";

const EditButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: editAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="edit-task-button" onClick={() => props.setShowForm((prevState) => !prevState)}>
      <div className="edit-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Edit</span>
      </div>
    </button>
  );
};

export default EditButton;