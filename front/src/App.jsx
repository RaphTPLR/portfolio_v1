import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
// import { gsap } from 'gsap';

import Home from './components/home'
import Details from './views/details'
import Cursor from './components/cursor'

function App() {
    return (
      <>
      <Cursor></Cursor>
        <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/:name" element={ <Details /> }></Route>
        </Routes>
      </>
    )
}

export default App
