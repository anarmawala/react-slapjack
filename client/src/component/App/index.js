import React from 'react';
import { compose } from 'recompose';
import './App.css';

import * as io from 'socket.io-client';

import { providerSocket } from '../Socket/context';
import NameInput from '../NameInput';

const App = (props) => {
  // socket.on('hello', () => {
  //   alert('Recieved Hello');
  // });

  return (
    <div className="App App-header">
      <h1 style={{ marginBottom: '5px' }}>Slapjack</h1>
      <p style={{ marginTop: '5px' }}>
        Brought to you by <br />
        Arshad | Jigar | Angela | Clark
      </p>

      {props.value == null && (
        <NameInput
          initSocket={(IP, port, user) =>
            props.initializeSocket(IP, port, user)
          }
        />
      )}
    </div>
  );
};

export default compose(providerSocket)(App);
