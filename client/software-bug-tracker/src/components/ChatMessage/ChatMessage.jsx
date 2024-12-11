import moment from "moment";
import './chat-message.css';



function ChatMessage(props) {
  
    const chatMessage = {
      text: props.text ? props.text : "",
      font: props.font ? props.font : "",
      date: props.date ? props.date : "",
      fontSize: props.fontSize ? props.fontSize : "",
      firstUser: props.firstUser ? true : false,
      user: props.user ? props.user : "",
      loggedInEmployee: props.loggedInEmployee ? props.loggedInEmployee : null,
      avatar: props.avatar
        ? props.avatar
        : "/uploads/default-profile-pic.jpg",
    };
    
    return (
      <div
        className={
          chatMessage.firstUser
            ? "container darker"
            : "container"
        }>
        <img
          src={chatMessage.avatar}
          alt="Avatar"
          style={{ width: "100%" }}
          className={chatMessage.firstUser ? "right" : ""}
        />
        <span
          className={chatMessage.firstUser ? "right" : ""}>
          {chatMessage.loggedInEmployee ? chatMessage.loggedInEmployee : ""} says:
        </span>
        <p
          className={chatMessage.font}
          style={{ fontSize: chatMessage.fontSize }}
          id="message-text">
          {chatMessage.text}
        </p>
        <span
          className={
            chatMessage.firstUser
              ? "time-left"
              : "time-right"
          }>
          {moment(chatMessage.date).format("h:mm a")}
        </span>
      </div>
    );
}

export default ChatMessage;