import moment from "moment";
import './chat-message.css';



function ChatMessage(props) {
  
    const chatMessage = {
      text: props.text ? props.text : "",
      font: props.font ? props.font : "",
      date: props.date ? props.date : "",
      fontSize: props.fontSize ? props.fontSize : "",
      firstUser: props.firstUser ? props.firstUser : "",
      user: props.user ? props.user : "",
      loggedInEmployee: props.loggedInEmployee ? props.loggedInEmployee : null,
      avatar: props.loggedInEmployee && props.loggedInEmployee.avatar
        ? props.loggedInEmployee.avatar
        : "/uploads/default-profile-pic.jpg",
    };

    return (
      <div
        className={
          chatMessage.firstUser === chatMessage.user
            ? "container darker"
            : "container"
        }>
        <img
          src={chatMessage.avatar}
          alt="Avatar"
          style={{ width: "100%" }}
          className={chatMessage.firstUser === chatMessage.user ? "right" : ""}
        />
        <span
          className={chatMessage.firstUser === chatMessage.user ? "right" : ""}>
          {chatMessage.loggedInEmployee.firstName}{" "}
          {chatMessage.loggedInEmployee.lastName} says:
        </span>
        <p
          className={chatMessage.font}
          style={{ fontSize: chatMessage.fontSize }}
          id="message-text">
          {chatMessage.text}
        </p>
        <span
          className={
            chatMessage.firstUser === chatMessage.user
              ? "time-left"
              : "time-right"
          }>
          {moment(chatMessage.date).format("h:mm a")}
        </span>
      </div>
    );
}

export default ChatMessage;