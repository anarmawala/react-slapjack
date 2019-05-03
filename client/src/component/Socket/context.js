import React from 'react';
import * as io from 'socket.io-client';
import * as _ from 'lodash';
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
            socket={this.state.socket}
            initializeSocket={(ip, port, name) => {
              if (this.state.socket === null) {
                let _socket = io(ip + ':' + port, {
                  query: 'name=' + name
                });

                this.setState({
                  socket: _socket
                });

                _socket.on('connect', (param) => {
                  console.log('Welcome to Slapjackv2');
                  this.setState({ socket: _socket });
                });

                _socket.on('Welcome to Slapjack', (param) => {
                  console.log('Welcome to Slapjack');
                  this.setState({ socket: _socket });
                });

                _socket.on('Player connected', (param) => {
                  console.log('Player connected ' + param);
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
