import React from 'react';
import './App.css';

import NameInput from '../NameInput';

const App = () => {
  return (
    <div className="App App-header">
      <h1 style={{ marginBottom: '5px' }}>SlapJack</h1>
      <p style={{ marginTop: '5px' }}>Bought to you by Group 6 in CS 342</p>
      <NameInput />
    </div>
  );
};

export default App;
