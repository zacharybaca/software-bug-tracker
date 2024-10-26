/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { Navigate } from "react-router-dom";

const LiveSupport = () => {
  const socketRef = useRef(null); // Socket reference
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  const user = JSON.parse(localStorage.getItem("user"))?.userID;

  // Initialize socket connection if it hasn’t been created yet
  if (!socketRef.current && user) {
    const url =
      nodeEnv === "production"
        ? "wss://software-bug-tracker.onrender.com"
        : "http://localhost:9000";

    socketRef.current = io(url, { transports: ["websocket", "polling"] });

    socketRef.current.on("connect", () => {
      console.log("Connected Successfully to Web Socket Connection");
      socketRef.current.emit("username", user);
    });

    socketRef.current.on("users", (users) => setUsers(users));
    socketRef.current.on("message", (message) =>
      setMessages((prevMessages) => [...prevMessages, message])
    );
    socketRef.current.on("connected", (newUser) =>
      setUsers((prevUsers) => [...prevUsers, newUser])
    );
    socketRef.current.on("disconnected", (id) =>
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    );
  }

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Handle sending message
  const submit = (e) => {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit("send", message);
      setMessage("");
    }
  };

  // Redirect to login if user is not found
  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <h1 id="support-heading">Welcome to Live Support, {user}!</h1>
      <div id="chat-container">
        <div id="messages-container">
          {messages.map(({ user, date, text }, index) => (
            <div key={index} className="message-container">
              <div className="message-time">
                {moment(date).format("h:mm:ss a")}
              </div>
              <div className="user-id-container">{user.name} says:</div>
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
              placeholder="Enter a message"
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
