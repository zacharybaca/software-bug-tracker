
const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return { ...state, message: action.payload };
        case "SET_MESSAGES":
            return { ...state, messages: action.payload };
        case "ADD_MESSAGE":
            return { ...state, messages: [...state.messages, action.payload] };
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "SET_TYPING_USERS":
            return { ...state, usersTyping: action.payload };
        case "SET_FONT":
            return { ...state, font: action.payload };
        case "SET_FONT_SIZE":
            return { ...state, fontSize: action.payload };
        case "RESET_MESSAGE_OPTIONS":
            return { ...state, font: "", fontSize: "" };
        default:
            return state;
    }
};

export default Reducer;
