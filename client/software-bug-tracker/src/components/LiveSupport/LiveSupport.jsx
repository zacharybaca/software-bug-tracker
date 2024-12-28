/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useContext } from "react";
import Lottie from 'react-lottie';
import typingAnimation from '../../animations/typing-animation.json';
import "./live-support.css";
import io from "socket.io-client";
import { Navigate } from "react-router-dom";
import { EmployeesContext } from "../../context/employeesContext";
import { SnackBarNotificationContext } from "../../context/snackBarNotificationContext";
import SpeechBubble from '../../assets/speech-bubble.gif';
import SettingsLogo from '../../assets/settings.gif';
import ChatListAvatar from '../../assets/developer.png';
import ChatMessage from '../ChatMessage/ChatMessage';


const LiveSupport = () => {
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usersTyping, setUsersTyping] = useState([]);
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState("");
  const context = useContext(EmployeesContext);
  const snackBarContext = useContext(SnackBarNotificationContext);
  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  const user = JSON.parse(localStorage.getItem("user"))?.userID;
  const loggedInEmployee = context.getLoggedInEmployee();
  const avatar =
    loggedInEmployee && loggedInEmployee.avatar ? loggedInEmployee.avatar : ChatListAvatar;
  const hasToken = context.getToken();

  const TypingIndicator = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: typingAnimation,
    };
    return (
      <div id="typing-indicator-animation">
        {usersTyping ? (
          <Lottie
            options={defaultOptions}
            height={50}
            width={200}
            style={{ marginRight: "70%", marginBottom: "10px" }}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  };
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

    if (localStorage.getItem("fontSize")) {
      const savedFontSize = Number(localStorage.getItem("fontSize"));
      setFontSize(savedFontSize);
    }
    else if (!localStorage.getItem("fontSize")) {
      localStorage.setItem("fontSize", fontSize);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messageHistory", JSON.stringify(messages));
    }

    if (font) {
      localStorage.setItem("font", font);
    }

    if (fontSize) {
      localStorage.setItem("fontSize", Number(fontSize));
    }

  }, [messages, font, fontSize]);


  const handleFont = (e) => {
    const { value } = e.target;
    setFont(value);
  };

  const handleFontSize = (e) => {
    const { value } = e.target;
    setFontSize(value);
  }

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

      socketRef.current.on("users", async (users) => setUsers(users));

      socketRef.current.on("message", (message) =>
        setMessages((prevMessages) => [...prevMessages, message])
      );

      socketRef.current.on("connected", (newUser) =>
        {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          snackBarContext.handleShowToast(newUser.name);
        }
      );

      socketRef.current.on("disconnected", (id) =>
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      );
      
      return () => {
        if (socketRef.current) {
          if (!hasToken) {
            socketRef.current.emit("disconnected", user.id)
          };
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [nodeEnv, user]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("typingUsers", (typingUsers) => {
        setUsersTyping(typingUsers);
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off("typingUsers");
      }
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (socketRef.current) {
      const messageData = {
        text: message,
        user: user,
        avatar: avatar
      };
      socketRef.current.emit("send", messageData);
      setMessage("");
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);

    if (socketRef.current) {
      const employeeName = `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`;
      socketRef.current.emit("typingStart", employeeName);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("typingStop");
      }, 1500);
    }
  };

  // Redirect to login if user is not found
  if (!user) return <Navigate to="/login" />;
  
  return (
    <>
      <h1 id="support-heading">
        Welcome to Live Support,{" "}
        {loggedInEmployee && loggedInEmployee.firstName
          ? loggedInEmployee.firstName
          : ""}{" "}
        {loggedInEmployee && loggedInEmployee.lastName
          ? loggedInEmployee.lastName
          : ""}
        !
      </h1>
      <div id="chat-container">
        <div id="messages-container">
          {messages.length > 0
            ? messages.map((message, index) => (
                <React.Fragment key={index}>
                  <ChatMessage
                    firstUser={users[0]?.name || loggedInEmployee.firstName}
                    user={message.user}
                    text={message.text}
                    font={font}
                    date={message.date}
                    fontSize={fontSize}
                    loggedInEmployee={
                      loggedInEmployee
                        ? `${loggedInEmployee.firstName} ${loggedInEmployee.lastName}`
                        : null
                    }
                    avatar={message.avatar || avatar}
                  />
                </React.Fragment>
              ))
            : ""}
        </div>
        <div id="users-online-container">
          <h1 id="users-online-heading">Users Online</h1>
          <ul id="users-online-list">
            {users.map((user) => (
              <li key={user.id} className="online-user">
                <img src={ChatListAvatar} alt="chat list avatar" />
                <p>{user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="typing-indicator">
        {usersTyping.length > 0 && usersTyping.length < 3 ? (
          <>
            <ul>
              {usersTyping.map((user, index) => (
                <li key={index}>
                  {usersTyping.length === 1
                    ? `${user.name} is currently typing a message`
                    : `${usersTyping[0].name} and ${usersTyping[1].name} are currently typing a message`}
                </li>
              ))}
            </ul>
            <TypingIndicator />
          </>
        ) : (
          <div>
            {usersTyping.length >= 3 ? (
              <>
                <p>There are many people typing a message</p>
                <TypingIndicator />
              </>
            ) : (
              <p>Nobody is typing a message....</p>
            )}
          </div>
        )}
      </div>
      <div id="form-container">
        <form onSubmit={submit} id="form">
          <textarea
            type="text"
            placeholder="Enter a message. Press Enter to Type More if You Run Out of Room."
            value={message}
            id="text"
            onChange={handleInputChange}
          />
          <button type="submit" id="submit-button">
            Send
          </button>
        </form>
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
            <option value="fancy-font">Fancy Style Font</option>
            <option value="playful-font">Playful Style Font</option>
            <option value="notebook-handwriting-font">
              Notebook Handwriting Style Font
            </option>
            <option value="egyptian-hieroglyphs-font">
              Egyptian Hieroglyphs Style Font
            </option>
          </select>
        </div>
        <div id="set-font-size-container">
          <img />
          <label htmlFor="fontSize">Select Your Font Size</label>
          <input
            type="number"
            id="fontSize"
            name="fontSize"
            value={fontSize}
            onChange={handleFontSize}
          />
        </div>
        <div id="clear-button-container">
          <img src={SpeechBubble} alt="speech-icon" />
          <button
            type="button"
            id="clear-messages-button"
            onClick={clearMessages}
            disabled={messages.length === 0}
            className={messages.length === 0 ? "not-allowed" : "allowed"}>
            Clear Messages
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveSupport;
