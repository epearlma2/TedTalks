import React, { createContext, useReducer } from "react";

// Create the initial state
const initialState = {
    savedTalks: [],
    watchedTalks: []
};

// Create the context
export const AppContext = createContext(initialState);

// Create the reducer function
const reducer = (state, action) => {
    // Define your state transitions based on the action type
    switch (action.type) {
        case "SAVE_TALK":
            return {
                ...state,
                savedTalks: [...state.savedTalks, action.payload],
            };
        case "WATCHED_TALK":
            return {
                ...state,
                watchedTalks: [...state.watchedTalks, action.payload],
            };
        case "UPDATE_STATE":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

// Create the provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Define any additional helper functions to update the state

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
