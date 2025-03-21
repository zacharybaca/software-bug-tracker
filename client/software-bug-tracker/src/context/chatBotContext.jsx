import React from 'react';

const ChatBotContext = React.createContext();


function ChatBotContextProvider(props) {
    const [showChatBox, setShowChatBox] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    
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

    return (
        <ChatBotContext.Provider
            value={{
                showChatBox,
                toggleChatBox,
                messages,
                message,
                handleSendMessage,
                setMessage
            }}
        >
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
