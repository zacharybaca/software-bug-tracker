import React from 'react';

const ChatBotContext = React.createContext();


function ChatBotContextProvider(props) {
    const [showChatBox, setShowChatBox] = React.useState(false);

    return (
        <ChatBotContext.Provider
            value={{
                showChatBox,
                setShowChatBox
            }}
        >
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
