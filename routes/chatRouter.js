const express = require("express");
const ChatMessage = require("../models/chat"); // ChatMessage Schema
const WebSocket = require("ws");
const jwt = require("jsonwebtoken"); // Assuming you're using JWT for authentication

const chatRouter = express.Router();

// Define a function to integrate WebSocket with the router
let wss;
function attachWebSocket(server) {
  if (wss) {
    console.warn("WebSocket Sever already attached.");
    return;
  }

  wss = new WebSocket.Server({ server });

  // Handle upgrading HTTP requests to WebSocket connections
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws, req) => {
    // Extract token from query string
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const token = urlParams.get("token");

    if (!token) {
      ws.close();
      console.error("No Token or Incorrect Token Attached")
      return;
    }

    // Validate the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        ws.close();
        console.error("Not A Valid Token");
        return;
      }

      const user = decoded;

      ws.on("message", async (message) => {
        try {
          // Save the chat message to the database
          const chatMessage = new ChatMessage({
            user: user._id,
            message,
          });
          await chatMessage.save();

          // Broadcast the message to all connected clients
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  user: `${user.firstName} ${user.lastName}`, // Send the username with the message
                  message,
                  createdAt: new Date(),
                })
              );
            }
          });
        } catch (err) {
          console.error("Error saving or broadcasting message:", err);
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  });
}

// GET route to fetch all chat messages
chatRouter.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.find().populate("user", "name"); // Populate user info
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chat messages" });
  }
});

module.exports = { chatRouter, attachWebSocket };
