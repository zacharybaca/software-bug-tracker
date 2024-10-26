import "./live-support.css";
import React from "react";
import moment from "moment";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
const nodeEnv = import.meta.env.VITE_NODE_ENV;

const LiveSupport = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const socketRef = React.useRef(null);

  // Retrieve the user outside of any conditional logic
  const user = JSON.parse(localStorage.getItem("user"))?.userID;

  React.useEffect(() => {
    // Only initialize socket and listeners if user exists
    if (user && !socketRef.current) {
      if (nodeEnv === "production") {
        socketRef.current = io("wss://software-bug-tracker.onrender.com", {
          transports: ["websocket", "polling"],
        });
      }
      
      if (nodeEnv === "development") {
        socketRef.current = io("http://localhost:9000", {
          transports: ["websocket", "polling"],
        });
      }
      
      socketRef.current.on("connect", () => {
        console.log("Connected Successfully to Web Socket Connection");
        socketRef.current.emit("username", user);
      });

      socketRef.current.on("users", (users) => {
        setUsers(users);
      });

      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketRef.current.on("connected", (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });

      socketRef.current.on("disconnected", (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [user]);

  // Check if user is not found and redirect
  if (!user) {
    return <Navigate to="/login" />;
  }

  const submit = (e) => {
    e.preventDefault();
    socketRef.current.emit("send", message);
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
