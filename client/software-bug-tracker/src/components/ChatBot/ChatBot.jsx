/* eslint-disable no-unused-vars */
import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';

const ChatBot = () => {
    const chatBot = React.useContext(ChatBotContext);

    return (
        <>
            {!chatBot.showChatBox ? <div id="chatbot-container" className="glow-on-access">
                <h1 onClick={chatBot.toggleChatBox}>Click Here for Help!</h1>
            </div> : 
            <div id="chatbot-box">
                <button type="button" id="chat-box-close-button" className="glow-on-access" onClick={chatBot.toggleChatBox}>❎Close</button>
                <div id="chat--bot">
                    <h1>Chatbot</h1>
                    <h1>Chatbot2</h1>
                </div>
            </div>}
        </>
    )
}

export default ChatBot;
