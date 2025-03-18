/* eslint-disable no-unused-vars */
import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';

const ChatBot = () => {
    const chatBot = React.useContext(ChatBotContext);

    return (
        <div id="chatbot-container">

        </div>
    )
}

export default ChatBot;
