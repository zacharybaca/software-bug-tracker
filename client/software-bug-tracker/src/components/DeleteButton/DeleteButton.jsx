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
    props.handleQuestion("Are You Sure You Want to Remove This Task?");
    if (props.confirmation) {
      props.deleteTask(props.id);
    }
    else {
      return false;
    }
  };

  // const isConfirmedRemoveEmployee = () => {
  //   props.handleQuestion("Are You Sure You Want to Remove This Employee?");
  //   if (props.confirmation) {

  //   }
  // }
  return (
    <button id="delete-task-button" className="glow-on-hovering" onClick={isConfirmed}>
      <div className="delete-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Delete</span>
      </div>
    </button>
  );
};

export default DeleteButton;
