import React, { useState } from 'react';
import './App.css';

import Minesweeper from './components/minesweeper';

import DIFFICULTY from './components/constants';

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY['easy']);
  return (
    <div className="App">
      <Minesweeper {...difficulty} />
    </div>
  );
}

export default App;
