
import './App.css';

/* 
  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '088f5dd98cmsh50fa4f17e97b1ddp108c9cjsn39f9273ff971',
    'X-RapidAPI-Host': 'ted-talks-api.p.rapidapi.com'
  }
};

fetch('https://ted-talks-api.p.rapidapi.com/talks?audio_lang=en&subtitle_lang=he&speaker=yuval_noah_harari&topic=politics', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

 */
import * as React from "react";
import { useReducer } from "react";
import { Search } from "./components/search/search";
import { Header } from "./components/header/header";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Speakers } from "./components/speakers/speakers";
import { Library } from "./components/library/library";
import { Notes } from "./components/notes/notes";

export const App = () => {

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/library" element={<Library />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </HashRouter>
  );
}
export default App;


