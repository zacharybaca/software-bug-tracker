/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from "react";
import "./live-support.css";
import io from "socket.io-client";
import moment from "moment";
import { Navigate } from "react-router-dom";
import { EmployeesContext } from "../../context/employeesContext";
import SpeechBubble from '../../assets/speech-bubble.gif';
import SettingsLogo from '../../assets/settings.gif';
import ChatListAvatar from '../../assets/developer.png';


const LiveSupport = () => {
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [font, setFont] = useState("");

  const context = useContext(EmployeesContext);
  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  const user = JSON.parse(localStorage.getItem("user"))?.userID;
  const loggedInEmployee = context.getLoggedInEmployee();

  // Function That Returns Parsed JSON
  // Returns An Empty Array If Value is Un-Parsable
  const parseJSON = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  };

  const clearMessages = () => {
    if (localStorage.getItem("messageHistory")) {
      localStorage.removeItem("messageHistory");
      setMessages([]);
    }
    else {
      return null;
    }
  };

  // Gets Saved Message History From Local Storage
  // Creates Local Storage Item if One Doesn't Exist, Then Initiates it With State of Messages
  useEffect(() => {
    if (localStorage.getItem("messageHistory")) {
      const savedMessages = parseJSON(localStorage.getItem("messageHistory"));
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
      }
    } else if (messages.length > 0 && !localStorage.getItem("messageHistory")) {
      localStorage.setItem("messageHistory", JSON.stringify(messages));
    }

    if (localStorage.getItem("font")) {
      const savedFont = localStorage.getItem("font");
      setFont(savedFont);
    }
    else if (!localStorage.getItem("font")) {
      localStorage.setItem("font", font);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messageHistory", JSON.stringify(messages));
    }

    if (font) {
      localStorage.setItem("font", font);
    }
  }, [messages, font]);


  const handleFont = (e) => {
    const { value } = e.target;
    setFont(value);
  };

  useEffect(() => {
    if (user) {
      const url =
        nodeEnv === "production"
          ? "wss://software-bug-tracker.onrender.com"
          : "http://localhost:9000";

      socketRef.current = io(url, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5, // Attempt to reconnect up to 5 times
      });

      socketRef.current.on("connect", () => {
        console.log("Connected Successfully to Web Socket Connection");
        socketRef.current.emit("username", user);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Connection Error:", error);
      });

      socketRef.current.on("reconnect_attempt", (attempt) => {
        console.log(`Reconnect attempt ${attempt}`);
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

      // Clean up the socket connection on component unmount
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [nodeEnv, user]);

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
          {messages.length > 0
            ? messages.map(({ user, date, text }, index) => (
                <div key={index} className="message-container">
                  <div className="message-time">
                    {moment(date).format("h:mm:ss a")}
                  </div>
                  <div className="user-id-container">
                    <div id="profile-thumbnail">
                      <img src={loggedInEmployee.avatar} alt="profile pic" />
                    </div>
                    <div id="username-container">{user.name} says:</div>
                  </div>
                  <div className={font}>{text}</div>
                </div>
              ))
            : ""}
        </div>
        <div id="users-online-container">
          <h1 id="users-online-heading">Users Online</h1>
          <ul id="users-online-list">
            {users.map(({ name, id }) => (
              <li key={id} className="online-user">
                <img src={ChatListAvatar} alt="chat list avatar" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="message-options-container">
        <div id="select-font-container">
          <img src={SettingsLogo} alt="settings logo" />
          <select id="font" name="font" value={font} onChange={handleFont}>
            <option value="">Select A Font To Style Your Message</option>
            <option value="message-content">Default Style</option>
            <option value="handwriting-font">Handwriting Style Font</option>
            <option value="cursive-font">Cursive Style Font</option>
            <option value="terminal-font">Terminal Style Font</option>
            <option value="colorful-font">Colorful Style Font</option>
          </select>
        </div>
        <div id="clear-button-container">
          <img src={SpeechBubble} alt="speech-icon" />
          <button
            type="button"
            id="clear-messages-button"
            onClick={clearMessages}
            disabled={messages.length === 0}
            className={messages.length === 0 ? "not-allowed" : "allowed"}
            >
            Clear Messages
          </button>
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
              autoFocus
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
