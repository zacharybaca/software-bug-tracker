import "./live-support.css";
import React from "react";
import moment from "moment";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
let socket;

const LiveSupport = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  // Retrieve the user outside of any conditional logic
  const user = JSON.parse(localStorage.getItem("user"))?.userID;

  React.useEffect(() => {
    // Only initialize socket and listeners if user exists
    if (user) {
      socket = io("http://localhost:9000", {
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => {
        console.log("Connected Successfully to Web Socket Connection");
        socket.emit("username", user);
      });

      socket.on("users", (users) => {
        setUsers(users);
      });

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("connected", (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });

      socket.on("disconnected", (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });

      // Clean up the socket connections and listeners on component unmount
      return () => {
        socket.off("connect");
        socket.off("users");
        socket.off("message");
        socket.off("connected");
        socket.off("disconnected");
        socket.disconnect(); // Close the socket connection
      };
    }
  }, [user]);

  // Check if user is not found and redirect
  if (!user) {
    return <Navigate to="/login" />;
  }

  const submit = (e) => {
    e.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <>
      <h1 id="support-heading">Welcome to Live Support {user}!</h1>
      <h2 id="support-heading-subtext">
        This is the Place to Receive and Give Help to Your Fellow Co-Workers!!
      </h2>
      <div id="chat-container">
        <div id="messages-container">
          {messages.map(({ user, date, text }, index) => (
            <div key={index} className="message-container">
              <div className="message-time">
                {moment(date).format("h:mm:ss a")}
              </div>
              <div className="user-id-container">{user.name} says: </div>
              <div className="message-content">{text}</div>
            </div>
          ))}
        </div>
        <div id="users-online-container">
          <h1 id="users-online-heading">Users Online</h1>
          <ul id="users-online-list">
            {users.map(({ name, id }) => (
              <li key={id} className="online-user">
                {name}
              </li>
            ))}
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
