import React, { useState, useContext } from "react";
import ReactPlayer from 'react-player/lazy'
import "./search.css";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext, AppProvider } from "../../AppState";
import { Library } from "../library/library";


const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        marginTop: "50px",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "5px",
    },
    input: {
        marginBottom: "20px",
        width: "100%",
    },
    submitButton: {
        marginTop: "20px",
        width: "10%"
    },
    videoContainer: {
        marginTop: "20px",
    },
    video: {
        width: "100%",
    },
}));




export const Search = () => {
    const [savedTalks, setSavedTalks] = useState([]);
    const { state, dispatch } = useContext(AppContext);
    const saveTalk = (talk) => {
        dispatch({ type: "SAVE_TALK", payload: talk });
    };
    const classes = useStyles();

    const [talks, setTalks] = useState(state.talks);
    const [from_record_date, set_from_record_date] = useState(state.from_record_date);
    const [to_record_date, set_to_record_date] = useState(state.to_record_date);
    const [record_date, set_record_date] = useState(state.record_date);
    const [from_publish_date, set_from_publish_date] = useState(state.from_publish_date);
    const [to_publish_date, set_to_publish_date] = useState(state.to_publish_date);
    const [publish_date, set_publish_date] = useState(state.publish_date);
    const [audio_lang, set_audio_lang] = useState(state.audio_lang);
    const [min_duration, set_min_duration] = useState(state.min_duration);
    const [max_duration, set_max_duration] = useState(state.max_duration);
    const [speaker, set_speaker] = useState(state.speaker);
    const [topic, set_topic] = useState(state.topic);

    const getTalks = () => {
        const url = "https://ted-talks-api.p.rapidapi.com/talks?";
        const options = {
            method: "GET",
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': '088f5dd98cmsh50fa4f17e97b1ddp108c9cjsn39f9273ff971',
                'X-RapidAPI-Host': 'ted-talks-api.p.rapidapi.com'
            },
        };

        const queryString = generateQueryString();
        const fetchUrl = url + queryString;


        fetch(fetchUrl, options)
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {

                console.log(data);
                console.log("hi " + JSON.stringify(data.result.results));
                const formattedTalks = data.result.results.map((talk) => {
                    return {
                        ...talk,
                        video_url: `https://www.ted.com/talks/${talk.id}`,
                    };
                });

                setTalks(formattedTalks); // Store the formatted API response in the state
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const generateQueryString = () => {
        let queryString = "";

        if (from_record_date) {
            queryString += `from_record_date=${from_record_date}`;
        }

        if (to_record_date) {
            queryString += `&to_record_date=${to_record_date}`;
        }

        if (record_date) {
            queryString += `&record_date=${record_date}`;
        }

        if (from_publish_date) {
            queryString += `&from_publish_date=${from_publish_date}`;
        }

        if (to_publish_date) {
            queryString += `&to_publish_date=${to_publish_date}`;
        }

        if (publish_date) {
            queryString += `&publish_date=${publish_date}`;
        }

        if (audio_lang) {
            queryString += `&audio_lang=${audio_lang}`;
        }

        if (min_duration) {
            queryString += `&min_duration=${min_duration}`;
        }

        if (max_duration) {
            queryString += `&max_duration=${max_duration}`;
        }

        if (speaker) {
            queryString += `&speaker=${speaker}`;
        }

        if (topic) {
            queryString += `&topic=${topic}`;
        }

        return queryString;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getTalks();

        // Dispatch an action to update the state
        dispatch({
            type: "UPDATE_STATE",
            payload: {
                talks,
                from_record_date,
                to_record_date,
                record_date,
                from_publish_date,
                to_publish_date,
                publish_date,
                audio_lang,
                min_duration,
                max_duration,
                speaker,
                topic
            }
        });
    };
    const handleSaveTalk = (talk) => {
        saveTalk(talk); // Dispatch an action to update the state
    };

    console.log("here is the talks array: ");
    console.log({ talks });
    return (
        <AppProvider>
            <center>
                <div>
                    <h1>Ted Talk Search</h1>
                    <SearchForm
                        handleSubmit={handleSubmit}
                        classes={classes}
                        from_record_date={from_record_date}
                        set_from_record_date={set_from_record_date}
                        to_record_date={to_record_date}
                        set_to_record_date={set_to_record_date}
                        record_date={record_date}
                        set_record_date={set_record_date}
                        from_publish_date={publish_date}
                        set_from_publish_date={set_from_publish_date}
                        to_publish_date={to_publish_date}
                        set_to_publish_date={set_to_publish_date}
                        publish_date={publish_date}
                        set_publish_date={set_publish_date}
                        audio_lang={audio_lang}
                        set_audio_lang={set_audio_lang}
                        min_duration={min_duration}
                        set_min_duration={set_min_duration}
                        max_duration={max_duration}
                        set_max_duration={set_max_duration}
                        speaker={speaker}
                        set_speaker={set_speaker}
                        topic={topic}
                        set_topic={set_topic}

                    />
                    {/* <button className="submitButton" onClick={getTalks}>Test</button> */}
                    {/* Display the API response */}
                    {talks && talks.length > 0 && (
                        <div className={classes.videoContainer}>
                            {talks.map((talk) => (
                                <div key={talk.id}>
                                    <h2>{talk.title}</h2>
                                    <p>Speaker: {talk.speaker}</p>
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
                                        <button className="saveButton" onClick={() => handleSaveTalk(talk)}>Save</button>
                                        <button>Watch</button>
                                    </div>
                                    {/*                             <ReactPlayer className={classes.video} controls>
                                <source src={talk.video_url} type="video/mp4" />
                            </ReactPlayer> */}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </center>
        </AppProvider>
    );
}

export const SearchForm = ({
    handleSubmit,
    classes,
    from_record_date,
    set_from_record_date,
    to_record_date,
    set_to_record_date,
    record_date,
    set_record_date,
    from_publish_date,
    set_from_publish_date,
    to_publish_date,
    set_to_publish_date,
    publish_date,
    set_publish_date,
    audio_lang,
    set_audio_lang,
    min_duration,
    set_min_duration,
    max_duration,
    set_max_duration,
    speaker,
    set_speaker,
    topic,
    set_topic

}) => {


    return (
        <center>
            <form style={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit} className={classes.formContainer}>
                <div style={{ alignItems: "left" }} >
                    <div>

                        <label htmlFor="from_record_date" className={classes.label}>Recorded From: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="from_record_date"
                            value={from_record_date}
                            onChange={(e) => set_from_record_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="to_record_date" className={classes.label}>Recorded To: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="to_record_date"
                            value={to_record_date}
                            onChange={(e) => set_to_record_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="record_date" className={classes.label}>Recorded Date: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="record_date"
                            value={record_date}
                            onChange={(e) => set_record_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="from_publish_date" className={classes.label}>Published From: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="from_publish_date"
                            value={from_publish_date}
                            onChange={(e) => set_from_publish_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="to_publish_date" className={classes.label}>Published To: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="to_publish_date"
                            value={to_publish_date}
                            onChange={(e) => set_to_publish_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="publish_date" className={classes.label}>Publish Date: (yyyy-mm-dd)</label>
                        <input
                            type="text"
                            id="publish_date"
                            value={publish_date}
                            onChange={(e) => set_publish_date(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="audio_lang" className={classes.label}>Audio Language:</label>
                        <input
                            type="text"
                            id="audio_lang"
                            value={audio_lang}
                            onChange={(e) => set_audio_lang(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="min_duration" className={classes.label}>Minimum Duration:</label>
                        <input
                            type="text"
                            id="min_duration"
                            value={min_duration}
                            onChange={(e) => set_min_duration(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="max_duration" className={classes.label}>Maximum Duration:</label>
                        <input
                            type="text"
                            id="max_duration"
                            value={max_duration}
                            onChange={(e) => set_max_duration(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="speaker" className={classes.label}>Speaker:</label>
                        <input
                            type="text"
                            id="speaker"
                            value={speaker}
                            onChange={(e) => set_speaker(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="topic" className={classes.label}>Topic:</label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => set_topic(e.target.value)}
                        />
                    </div>

                    <button className="submitButton" type="submit">Submit</button>
                </div>
            </form>
        </center>
    );
};
