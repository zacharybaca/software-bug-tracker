import React from 'react';
const nodeEnv = import.meta.env.VITE_NODE_ENV;
const apiUrl =
    nodeEnv === "development"
        ? "http://localhost:3000/api/bot"
        : "https://ai-chatbot-mtn3.onrender.com";
const ChatBotContext = React.createContext();


function ChatBotContextProvider(props) {
    const [showChatBox, setShowChatBox] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);

    const getToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, please log in.");
          return null;
        }
        return token;
      };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Add the user's message to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", text: typeof message === "string" ? message : message.message }
            ]);

            const userMessage = message; // Save message before clearing
            console.log('userMessage', userMessage)
            setMessage(""); // Clear input after sending

            // Send the message to the chatbot
            await chatWithBot(userMessage);
        }
    };

    const clearMessage = () => {
        setMessage("");
    };

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    }

    const chatWithBot = async (message) => {
        try {
            const token = getToken();

            if (!token) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "You are not logged in. Please log in to interact with the chatbot." },
                ]);
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message }), // Ensure it's structured correctly
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
            }

            const data = await response.json();
            console.log("API response:", data); // Log the response format for debugging

            // Ensure data.text is either a string or an array
            const botResponse = data.answer || data.text || "I didn't understand that.";

            // Add the response to the messages
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: botResponse },
            ]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <ChatBotContext.Provider
            value={{
                showChatBox,
                toggleChatBox,
                messages,
                message,
                handleSendMessage,
                setMessage,
                chatWithBot,
                clearMessage
            }}
        >
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
