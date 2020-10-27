import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/main.css'
import {getDateForAPIRequest} from "./helper/div";

import AsteroidList from "./components/AsteroidList";

function App() {
    return (
        <div className="App">
            <div className={"header"}>
                <h1> Asteroids coming close to earth </h1>
                <p> Select a day and a view (list or graph). Data taken directly from NASA: <a href={"https://api.nasa.gov/"}> api.nasa.gov </a> </p>
            </div>
            <AsteroidList startDate={getDateForAPIRequest()}/>
        </div>
    );
}

export default App;
