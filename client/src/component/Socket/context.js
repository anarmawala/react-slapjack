import React, { useState } from 'react';
import * as io from 'socket.io-client';

const SocketContext = React.createContext(null);

export const consumerSocket = (Component) => (props) => (
  <SocketContext.Consumer>
    {(socket) => <Component {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export const providerSocket = (Component) => {
  class ProviderSocket extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        socket: null
      };
    }

    render() {
      return (
        <SocketContext.Provider value={this.state.socket}>
          <Component
            {...this.props}
            initializeSocket={(ip, port, name) => {
              if (this.state.socket === null) {
                this.setState({
                  socket: io(ip + ':' + port, {
                    query: 'name=' + name
                  })
                });
              } else {
                alert('Socket already running');
              }
            }}
          />
        </SocketContext.Provider>
      );
    }
  }

  return ProviderSocket;
};

export default SocketContext;
