import Lottie from "react-lottie";
import "./tasks-button.css";
import tasksAnimation from "../../animations/tasks-animation.json";

const TasksButton = (props) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: tasksAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button id="my-tasks-button" onClick={() => {
      props.navigate("/tasks");
      props.setShowMenu(!props.showMenu);
    }}>
      <div className="tasks-content">
        <Lottie options={lottieOptions} height={40} width={40} />
        <span>Employee Tasks</span>
      </div>
    </button>
  );
};


export default TasksButton;
