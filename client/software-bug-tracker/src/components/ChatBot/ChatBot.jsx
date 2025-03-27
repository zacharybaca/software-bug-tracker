import React from 'react';
import './chat-bot.css';
import { ChatBotContext } from '../../context/chatBotContext';
import { EmployeesContext } from '../../context/employeesContext';
import ChatIcon from "../../assets/chat.ico";
import BotIcon from "../../assets/bot.png";
import DevIcon from "../../assets/developer-chatbot.png";
import CloseIcon from "../../assets/close-chat-icon.png";

const ChatBot = () => {
    const employees = React.useContext(EmployeesContext);
    const chatBot = React.useContext(ChatBotContext);
    const chatRef = React.useRef(null);
    const loggedInEmployee = employees.getLoggedInEmployee();
    console.log('CM: ', chatBot.messages.map(msg => msg.text[0]));

    React.useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
          }
    }, [chatBot.messages]);

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
                                    <img src={CloseIcon} alt="Close Icon" />
                                </button>
                        </div>

                    </div>
                    <div id="chat--bot" ref={chatRef}>

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
                                            {msg.sender === "user" ? <span className="you-span"><img src={DevIcon} alt="Developer Icon" /> {loggedInEmployee ? loggedInEmployee.firstName + " " + loggedInEmployee.lastName : "You: "}</span> : <span className="bot-span"><img src={BotIcon} alt="Bot Icon" /> Bot: </span>}
                                            {typeof msg.text === "string" ? msg.text : msg.text.message}
                                        </li>

                                    ))
                                }

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
