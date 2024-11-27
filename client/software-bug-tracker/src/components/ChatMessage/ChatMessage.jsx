import React, { useContext } from 'react';
import { EmployeesContext } from '../../context/employeesContext';
import './chat-message.css';



function ChatMessage(props) {
  
    const context = useContext(EmployeesContext);

    const initialValues = {
      text: props.text ? props.text : "",
      font: props.font ? props.font : "",
      user: props.user ? props.user : null,
      date: props.date ? props.date : "",
      loggedInEmployee: props.loggedInEmployee ? props.loggedInEmployee : null,
      avatar: props.loggedInEmployee ? props.loggedInEmployee.avatar : null
    };

    const [chatMessage, setChatMessage] = React.useState(initialValues);


    return (
      <>
        <div className="container">
          <img
            src="/w3images/bandmember.jpg"
            alt="Avatar"
            style="width:100%;"
          />
          <p>Hello. How are you today?</p>
          <span className="time-right">11:00</span>
        </div>

        <div className="container darker">
          <img
            src="/w3images/avatar_g2.jpg"
            alt="Avatar"
            className="right"
            style="width:100%;"
          />
          <p>Hey! I`&apos;`m fine. Thanks for asking!</p>
          <span className="time-left">11:01</span>
        </div>
      </>
    );
}

export default ChatMessage;