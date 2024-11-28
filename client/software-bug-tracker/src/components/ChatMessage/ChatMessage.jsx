import React, { useContext } from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import moment from "moment";
import './chat-message.css';



function ChatMessage(props) {
  
    const context = useContext(EmployeesContext);

    const initialValues = {
      messageIndex: props.messageIndex ? props.messageIndex : "",
      text: props.text ? props.text : "",
      font: props.font ? props.font : "",
      user: props.user ? props.user : null,
      date: props.date ? props.date : "",
      loggedInEmployee: props.loggedInEmployee ? props.loggedInEmployee : null,
      avatar: props.loggedInEmployee ? props.loggedInEmployee.avatar : null
    };

    const [chatMessage, setChatMessage] = React.useState(initialValues);


    return (
        <div className={chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0 ? "container darker" : "container"}>
          <img
            src={chatMessage.loggedInEmployee.avatar}
            alt="Avatar"
            style="width:100%;"
          />
          <p className={chatMessage.font}>{chatMessage.text}</p>
          <span className={chatMessage.messageIndex && chatMessage.messageIndex % 2 === 0 ? "time-left" : "time-right"}>{moment(chatMessage.date).format("h:mm a")}</span>
        </div>
    );
}

export default ChatMessage;