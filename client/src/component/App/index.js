import React from 'react';
import { compose } from 'recompose';
import './App.css';

import { providerSocket } from '../Socket/context';
import NameInput from '../NameInput';

const App = (props) => {
  // socket.on('hello', () => {
  //   alert('Recieved Hello');
  // });

  return (
    <div className="App App-header">
      {/* {props.socket !== null && <div>{JSON.stringify(props.socket)}</div>} */}

      {props.socket === null && (
        <NameInput
          initSocket={(IP, port, user) =>
            props.initializeSocket(IP, port, user)
          }
        />
      )}

      {props.socket !== null && props.socket.disconnected && (
        <div>Connecting</div>
      )}
      {props.socket !== null && props.socket.connected && (
        <div>Hello there</div>
      )}
    </div>
  );
};

export default compose(providerSocket)(App);
