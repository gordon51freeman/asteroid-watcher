import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/main.css'
import {getDateForAPIRequest} from "./helper/div";

import AsteroidList from "./components/AsteroidList";

function App() {
  return (
    <div className="App">
      <AsteroidList startDate={getDateForAPIRequest()}/>
    </div>
  );
}

export default App;
