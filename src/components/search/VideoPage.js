import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Notes } from "../notes/notes";
import { useLocation } from "react-router-dom";

export const VideoPage = ({ handleAddNote }) => { // Update parameter declaration here
    const location = useLocation();
    const talk = location.state;

    const [note, setNote] = useState("");

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const handleSaveNote = () => {
        handleAddNote(talk.title, note);
        setNote("");
    };

    return (
        <div>
            {talk && (
                <div className="description">
                    <h2>{talk.title}</h2>
                    <p>Published: {talk.publish_date}</p>
                    <p>Description: {talk.description}</p>
                    <div style={{}}>
                        <ReactPlayer
                            url={talk.mp4_url}
                            playing={false}
                            controls={true}
                            loop={true}
                            muted={false}
                            playsInline={true}
                        />
                    </div>

                    <p>Enter Notes here: </p>
                    <textarea value={note} onChange={handleNoteChange} />
                    <button onClick={handleSaveNote}>Save Note</button>

                    <Notes talk={talk} notes={[note]} />
                </div>
            )}
        </div>
    );
};
