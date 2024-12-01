import moment from "moment";
import './chat-message.css';



function ChatMessage(props) {
  
    const chatMessage = {
      messageIndex: props.messageIndex ? props.messageIndex : "",
      text: props.text ? props.text : "",
      font: props.font ? props.font : "",
      date: props.date ? props.date : "",
      loggedInEmployee: props.loggedInEmployee ? props.loggedInEmployee : null,
      avatar: props.loggedInEmployee && props.loggedInEmployee.avatar
        ? props.loggedInEmployee.avatar
        : "/uploads/default-profile-pic.jpg",
    };

    return (
      <div
        className={
          chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0
            ? "container darker"
            : "container"
        }>
        <img
          src={chatMessage.avatar}
          alt="Avatar"
          style="width:100%;"
          className={
            chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0 ? "right" : ""
          }
        />
        <span
          className={
            chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0 ? "right" : ""
          }
          >
            {chatMessage.loggedInEmployee.firstName} {chatMessage.loggedInEmployee.lastName}
        </span>
        <p className={chatMessage.font}>{chatMessage.text}</p>
        <span
          className={
            chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0
              ? "time-left"
              : "time-right"
          }>
          {moment(chatMessage.date).format("h:mm a")}
        </span>
      </div>
    );
}

export default ChatMessage;