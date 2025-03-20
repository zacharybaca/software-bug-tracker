import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';
import ChatIcon from "../../assets/chat.ico";

const ChatBot = () => {
    const chatBot = React.useContext(ChatBotContext);

    return (
        <>
            {!chatBot.showChatBox ? <div id="chatbot-container" className="glow-on-access">
                <img src={ChatIcon} alt="chat-icon" />
                <h1 onClick={chatBot.toggleChatBox}>Click Here for Help!</h1>
            </div> :
            <div id="chatbot-box">
                <div id="chatbox-heading">
                    <h1>Issue Insight Chatbot</h1>
                    <button type="button" id="chat-box-close-button" className="glow-on-access" onClick={chatBot.toggleChatBox}>❎Close</button>
                </div>
                <div id="chat--bot">
                    {<ul>
                    {[...Array(15)].map((_, i) => (
                        <li key={i}>Chatbot {i + 1}</li>
                    ))}
                    </ul>}
                    <div id="message-box">
                        <textarea id="messageArea" name="messageArea" rows="4" cols="50" placeholder="Type a message..."></textarea>
                        <button type="submit" id="submitMessage" name="submitMessage">Send</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ChatBot;
