import React, { useState, useContext } from "react";
import ReactPlayer from 'react-player/lazy';
import "./library.css";
import { AppContext, AppProvider } from "../../AppState";
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const Library = () => {
    const { state, dispatch } = useContext(AppContext);
    const { savedTalks, watchedTalks } = state;
    const navigate = useNavigate();
    const handleWatchTalk = (talk) => {
        dispatch({ type: "WATCHED_TALK", payload: talk });
        navigate(`/video/${talk.id}`, { state: talk });
    };

    return (
        <div>
            <h2 className="library-heading">My Library</h2>
            <div className="library-container">
                {/* Saved Talks */}
                <div className="talks-container">
                    <div className="talks-section">
                        <h3 className="saved-talks">Saved Talks</h3>
                        {savedTalks && savedTalks.length > 0 ? (
                            savedTalks.map((talk) => (
                                <div key={talk.id}>
                                    <h4>{talk.title}</h4>
                                    <div className="description">
                                        <p>{talk.description}</p>
                                    </div>
                                    <div>
                                        <ReactPlayer
                                            url={talk.mp4_url}
                                            playing={false}
                                            controls={true}
                                            loop={true}
                                            muted={false}
                                            playsinline={true}
                                        />
                                    </div>
                                    <div>
                                        <button className="watchButton" onClick={() => handleWatchTalk(talk)}>Watch</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No talks saved in your library</p>
                        )}
                    </div>

                    {/* Border */}
                    <div className="border"></div>

                    {/* Watched Talks */}
                    <div className="talks-section">
                        <h3 className="history-heading">History</h3>
                        {watchedTalks && watchedTalks.length > 0 ? (
                            watchedTalks.map((talk) => (
                                <div key={talk.id}>
                                    <h4>{talk.title}</h4>
                                    <div className="description">
                                        <p>{talk.description}</p>
                                    </div>
                                    <div>
                                        <ReactPlayer
                                            url={talk.mp4_url}
                                            playing={false}
                                            controls={true}
                                            loop={true}
                                            muted={false}
                                            playsinline={true}
                                        />
                                    </div>
                                    <div>
                                        <button className="watchButton" onClick={() => handleWatchTalk(talk)}>Watch</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No watched talks in your history</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Library;
