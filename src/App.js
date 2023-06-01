// App.js
import React, { useState } from "react";
import { AppProvider } from "./AppState";
import { Search } from "./components/search/search";
import { VideoPage } from "./components/search/VideoPage";
import { Header } from "./components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Library } from "./components/library/library";
import NotesPage from "./components/notes/notespage";

export const App = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (talk, note) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { talk: talk, notes: [note] },
    ]);
  };


  return (
    <AppProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/video/:id" element={<VideoPage handleAddNote={handleAddNote} />} />
          <Route path="/library" element={<Library />} />
          <Route path="/notespage" element={<NotesPage notes={notes} />} />


        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
