// 
import React, { useEffect, useRef, useState } from "react";

const LiveSupport = () => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // replace with your token logic
    const websocket = new WebSocket(`ws://localhost:9000/?token=${token}`);

    socketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    websocket.onmessage = (message) => {
      console.log("Message from server:", message.data);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    websocket.onclose = (event) => {
      console.log("WebSocket Closed:", event);
      setIsConnected(false);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (msg) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(msg);
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  };

  return (
    <div>
      <h1>Live Support</h1>
      {/* Your chat UI here */}
      <button onClick={() => sendMessage("Hello, World!")}>Send Message</button>
    </div>
  );
};

export default LiveSupport;
