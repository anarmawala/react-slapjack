import React, { useState } from 'react';
import * as io from 'socket.io-client';

const SocketContext = React.createContext(null);

export const consumerSocket = (Component) => (props) => (
  <SocketContext.Consumer>
    {(socket) => <Component {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// export const providerSocket = (Component) => (props) => {
//   const [socket, setSocket] = useState(null);

//   return (
//     <SocketContext.Provider value={null}>
//       <Component
//         {...this.props}
//         initializeSocket={(ip, port, name) => {
//           setSocket(
//             io.openSocket(ip + ':' + port, {
//               query: 'name=' + name
//             })
//           );
//         }}
//       />
//     </SocketContext.Provider>
//   );
// };

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
              this.setState({
                socket: io(ip + ':' + port, {
                  query: 'name=' + name
                })
              });
            }}
          />
        </SocketContext.Provider>
      );
    }
  }

  return ProviderSocket;
};

export default SocketContext;
