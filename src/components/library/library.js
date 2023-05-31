import React, { useContext } from "react";
import ReactPlayer from 'react-player/lazy';
import "./library.css";
import { AppContext } from "../../AppState";

export const Library = () => {
    const { state } = useContext(AppContext);
    const { savedTalks } = state;

    return (
        <div>
            <h2>My Library</h2>
            {savedTalks && savedTalks.length > 0 ? (
                savedTalks.map((talk) => (
                    <div key={talk.id}>
                        <h3>{talk.title}</h3>
                        <p>{talk.description}</p>
                        <div style={{}}>
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
                            <button>Watch</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No talks saved in your library</p>
            )}
        </div>
    );
};

export default Library;
