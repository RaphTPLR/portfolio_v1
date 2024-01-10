import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
// import { gsap } from 'gsap';

import Home from './components/home'
import Pokedex from './views/pokedex'

function App() {
    return (
      <>
        <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/Pokedex" element={ <Pokedex /> }></Route>
        </Routes>
      </>
    )
}

export default App
