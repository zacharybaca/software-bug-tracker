import React from 'react';

const ChatMessagesContext = React.createContext();


function ChatMessagesContextProvider(props) {

    const [messages, setMessages] = React.useState([]);


     const getToken = () => {
       const token = localStorage.getItem("token");
       if (!token) {
         console.warn("No token found, please log in.");
         return null; // Return null instead of throwing an error
       }
       return token;
     };

     React.useEffect(() => {
       const fetchChatMessages = async () => {
        try {
            const token = getToken();
            if (!token) return;

            const res = await fetch("/api/main/messages", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
            },
            });

             if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText} : ${await res.text()}`);
            }

            const data = await res.json();
            setMessages(data); // Set the chat history in state
        } catch (error) {
            console.error(error);
        }
       };
       fetchChatMessages();
     }, []);

     return (
        <ChatMessagesContext.Provider
            value={{
                messages
            }}>
                {props.children}
            </ChatMessagesContext.Provider>
     );
}

export { ChatMessagesContext, ChatMessagesContextProvider };