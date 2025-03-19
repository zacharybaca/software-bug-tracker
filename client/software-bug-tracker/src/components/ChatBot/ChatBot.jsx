/* eslint-disable no-unused-vars */
import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';

const ChatBot = () => {
    const chatBot = React.useContext(ChatBotContext);

    return (
        <div id="chatbot-container">
            <h1>Click Here for Help!</h1>
        </div>
    )
}

export default ChatBot;
