import React from 'react';

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage(""); // Clear input after sending
        }
    };

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    }

    const chatWithBot = async (message) => {
        try {
            const token = getToken();

            const response = await fetch("http://localhost:3000/bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} : ${await response.text()}`);
            }
            
            const data = await response.json();
            setMessages((prevState) => [...prevState, data]);
        } catch (error) {
            console.error(error);
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
                chatWithBot
            }}
        >
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
