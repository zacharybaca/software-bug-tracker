import './live-support.css';
import React from 'react';

const LiveSupport = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const socket = new WebSocket('ws://localhost:8000');

    React.useEffect(() => {
        socket.onmessage = (event) => {
            const newMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleSend = () => {
        socket.send(input);
        setInput('');
    };


    return (
        <div>
            <div id="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="button" onClick={handleSend}>Send</button>
        </div>
    );
};

export default LiveSupport;