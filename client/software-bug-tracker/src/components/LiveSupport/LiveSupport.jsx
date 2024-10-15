import './live-support.css';
import React from "react";
import io from "socket.io-client";

const user = localStorage.getItem('user');
const username = JSON.parse(user);
const usernameVal = username.userID;
console.log("User: ", usernameVal);
const socket = io("http://localhost:9000", {
  transports: ["websocket", "polling"]
});

const LiveSupport = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log('Connected Successfully to Web Socket Connection');
      socket.emit("username", usernameVal);
      
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <>
      <h1 id="support-heading">Live Support</h1>
      <div id="chat-container">
        <div id="messages-container"></div>
        <div id="users-online-container">
          <h1 id="users-online-heading">Users Online</h1>
          <ul id="users-online-list">
            {users.map((user) => {
              return (
                <li key={user.id} className="online-user">
                  {user.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div id="form-container">
        <form onSubmit={submit} id="form">
          <div id="message-input-container">
            <input
              type="text"
              placeholder="Enter A Message To Send"
              value={message}
              id="text"
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
            <button type="submit" id="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LiveSupport;
