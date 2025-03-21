import React, { useContext, useState } from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';
import ChatIcon from "../../assets/chat.ico";

const ChatBot = () => {
    const chatBot = useContext(ChatBotContext);
    

    return (
        <>
            {!chatBot.showChatBox ? (
                <div id="chatbot-container">
                    <img src={ChatIcon} alt="Chat Icon" />
                    <button type="button" id="help-button" onClick={chatBot.toggleChatBox} className="glow-on-access">
                        Click Here for Help!
                    </button>
                </div>
            ) : (
                <div id="chatbot-box">
                    <div id="chatbox-heading">
                        <h1>Issue Insight Chatbot</h1>
                        <button 
                            type="button" 
                            id="chat-box-close-button" 
                            className="glow-on-access" 
                            onClick={chatBot.toggleChatBox}
                        >
                            ❎ Close
                        </button>
                    </div>
                    <div id="chat--bot">
                        <ul>
                            {[...Array(15)].map((_, i) => (
                            <li key={i}>Chatbot {i + 1}</li>
                            ))}
                            {chatBot.messages.map((msg, i) => (
                                <li key={i}>{msg}</li>
                            ))}
                        </ul>
                        <div id="message-box">
                            <form onSubmit={chatBot.handleSendMessage} id="message-form">
                                <textarea 
                                    id="messageArea" 
                                    name="messageArea" 
                                    rows="4" 
                                    cols="50" 
                                    placeholder="Type a message..." 
                                    value={chatBot.message} 
                                    onChange={(e) => chatBot.setMessage(e.target.value)}
                                />
                                <button type="submit" id="submitMessage">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
