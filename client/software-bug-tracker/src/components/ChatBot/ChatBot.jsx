import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';
import ChatIcon from "../../assets/chat.ico";

const ChatBot = () => {
    const chatBot = React.useContext(ChatBotContext);
    console.log('CM: ', chatBot.messages.map(msg => msg.text[0]));

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
                        <div id="chatbox-title">
                            <img src={ChatIcon} alt="Chat Icon" />
                            <h1>Issue Insight Chatbot</h1>
                        </div>
                        <div id="close-chat-button-container">
                                <button
                                    type="button"
                                    id="chat-box-close-button"
                                    className="glow-on-access"
                                    onClick={chatBot.toggleChatBox}
                                >
                                    ❎ Close
                                </button>
                        </div>

                    </div>
                    <div id="chat--bot">

                        <ul>
                            {[...Array(15)].map((_, i) => (

                                <li key={i} className={i % 2 === 0 ? "user-message" : "bot-message"}>Chatbot {i + 1}</li>


                            ))}
                                    {console.log("ChatBot messages:", chatBot.messages.map(msg => msg.text))
}
                        </ul>
                            <ul>
                                {Array.isArray(chatBot.messages) &&
                                    chatBot.messages.map((msg, i) => (
                                        <li key={i} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                            {msg.sender === "user" ? "You: " : "Bot: "}
                                            {typeof msg.text === "string" ? msg.text : msg.text.message}
                                        </li>

                                    ))
                                }

                            </ul>
                        <hr />
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
                                <button type="submit" id="submit-message-button" className="hvr-pulse">
                                    Send
                                </button>
                                <button type="button" id="clear-message-button" className="hvr-pulse" onClick={chatBot.clearMessage}>
                                    Clear
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
