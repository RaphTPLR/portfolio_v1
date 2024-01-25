import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
// import { gsap } from 'gsap';

import Home from './views/home'
import Details from './components/details'
import Cursor from './components/cursor'
import PreLoader from './components/loader'

import Pokedex from './views/pokedex';
import AVG from './views/avg';
import Scamerz from './views/scamerz';
import Gourmet from './views/gourmet';
import CarteX from './views/cartex';
import MET from './views/met';
import Clones from './views/clones';
import LeagIn from './views/leagin';

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
            {/* <Route path="/:name" element={ <Details /> }></Route> */}
            <Route path='/Pokedex' element={ <Pokedex />}></Route>
            <Route path='/AVG-Challenge' element={ <AVG />}></Route>
            <Route path='/Scamerz' element={ <Scamerz />}></Route>
            <Route path='/Gourmet' element={ <Gourmet />}></Route>
            <Route path='/CarteX' element={ <CarteX />}></Route>
            <Route path='/MET' element={ <MET />}></Route>
            <Route path='/Clones' element={ <Clones />}></Route>
            <Route path='/LeagIn' element={ <LeagIn />}></Route>
        </Routes>
      </>
    )
}

export default App
