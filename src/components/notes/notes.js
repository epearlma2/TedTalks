
import "./notes.css";
import React, { useState, useContext } from "react";
import ReactPlayer from 'react-player/lazy'

import { AppContext, AppProvider } from "../../AppState";
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const Notes = ({ talk, notes }) => {
    const notesArray = Array.isArray(notes) ? notes : [];

    return (
        <div>
            <h3>{talk.title}</h3>
            {notesArray.map((note, index) => (
                <span key={index}>{note}</span>
            ))}
        </div>
    );
};
