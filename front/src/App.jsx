import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
// import { gsap } from 'gsap';

import Home from './components/home'
import Details from './views/details'
import Cursor from './components/cursor'
import PreLoader from './components/loader'

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    return (
      <>
      <PreLoader/>
      <Cursor darkMode={darkMode} />
        <Routes>
            <Route path="/" element={ <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> }></Route>
            <Route path="/:name" element={ <Details /> }></Route>
        </Routes>
      </>
    )
}

export default App
