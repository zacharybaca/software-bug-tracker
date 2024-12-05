import { Player } from "react-lottie";
import "./tasks-button.css";
import tasksAnimation from "../../animations/tasks-animation.json";

const TasksButton = () => {
  return (
    <button id="my-tasks-button">
      <Player autoplay loop src={tasksAnimation} style={lottieStyle} />
      Employee Tasks
    </button>
  );
};

const lottieStyle = {
  width: "40px", // Adjust the size of the animation
  height: "40px",
  marginRight: "10px",
};

export default TasksButton;