import React from 'react';

const ChatBotContext = React.createContext();


function ChatBotContextProvider(props) {
    const [showChatBox, setShowChatBox] = React.useState(false);

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    }

    return (
        <ChatBotContext.Provider
            value={{
                showChatBox,
                toggleChatBox
            }}
        >
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
