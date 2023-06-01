import React from "react";
import { Notes } from "../notes/notes";

const NotesPage = ({ notes }) => {
    const notesArray = Array.isArray(notes) ? notes : [];

    return (
        <div>
            <center>
                <h2>My Notes</h2>
                {notesArray.map((note, index) => (
                    <div key={index}>
                        {note.talk && (
                            <React.Fragment>
                                <h3>{note.talk.title}</h3>
                                <Notes talk={note.talk} notes={note.notes} />
                            </React.Fragment>
                        )}
                        <hr />
                    </div>
                ))
                }
            </center >
        </div >
    );
};

export default NotesPage;
