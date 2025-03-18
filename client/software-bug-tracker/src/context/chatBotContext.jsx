import React from 'react';

const ChatBotContext = React.createContext();


function ChatBotContextProvider(props) {

    return (
        <ChatBotContext.Provider>
            {props.children}
        </ChatBotContext.Provider>
    );
}

export { ChatBotContextProvider, ChatBotContext };
