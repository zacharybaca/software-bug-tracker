import React, { useEffect, useReducer, useRef, useContext } from "react";
import io from "socket.io-client";
import { EmployeeContext } from "../../context/EmployeesContext";
import Reducer, { initialState } from "../../reducers/Reducer";
import { Button } from "@/components/ui/button";

const socket = io("ws://localhost:9000");

export default function AlternativeLiveSupport() {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const { user } = useContext(EmployeeContext);
    const scrollRef = useRef(null);

    const handleInputChange = (e) => {
        dispatch({ type: "SET_MESSAGE", payload: e.target.value });
        socket.emit("typing", user.firstName);
    };

    const submit = (e) => {
        e.preventDefault();
        if (state.message.trim() !== "") {
            socket.emit("chat message", `${user.firstName}: ${state.message}`);
            dispatch({ type: "SET_MESSAGE", payload: "" });
        }
    };

    const resetMessageOptions = () => {
        dispatch({ type: "SET_FONT", payload: "" });
        dispatch({ type: "SET_FONT_SIZE", payload: "" });
    };

    useEffect(() => {
        socket.on("chat message", (message) => {
            dispatch({ type: "ADD_MESSAGE", payload: message });
        });

        socket.on("users online", (users) => {
            dispatch({ type: "SET_USERS", payload: users });
        });

        socket.on("users typing", (usersTyping) => {
            dispatch({ type: "SET_USERS_TYPING", payload: usersTyping });
        });

        return () => {
            socket.off("chat message");
            socket.off("users online");
            socket.off("users typing");
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [state.messages]);

    useEffect(() => {
        if (state.messages.length > 0) {
            localStorage.setItem("messageHistory", JSON.stringify(state.messages));
        }
        if (state.font) {
            localStorage.setItem("font", state.font);
        }
        if (state.fontSize) {
            localStorage.setItem("fontSize", Number(state.fontSize));
        }
    }, [state.messages, state.font, state.fontSize]);

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Live Support Chat</h2>
            <div
                ref={scrollRef}
                className="h-96 overflow-y-scroll border rounded-lg p-4 bg-gray-50"
            >
                {state.messages.map((msg, idx) => (
                    <p key={idx} style={{ fontFamily: state.font, fontSize: state.fontSize }}>
                        {msg}
                    </p>
                ))}
            </div>
            <div className="mt-4">
                <form onSubmit={submit} className="flex gap-2">
                    <textarea
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter a message..."
                        value={state.message}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">Send</Button>
                </form>
                <Button onClick={resetMessageOptions} className="mt-2 w-full">
                    Reset Font Options
                </Button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
                Users online: {state.users.join(", ")}<br />
                Typing: {state.usersTyping.join(", ")}
            </div>
        </div>
    );
}
