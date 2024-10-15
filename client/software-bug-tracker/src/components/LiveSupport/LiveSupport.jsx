// 
import React from "react";
import io from "socket.io-client";

const username = localStorage.getItem(JSON.parse("user"));
const socket = io("http://localhost:9000", {
  transports: ["websocket", "polling"]
});

const LiveSupport = () => {
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
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
    <div>
      <h1>Live Support</h1>
      {/* Your chat UI here */}
    </div>
  );
};

export default LiveSupport;
