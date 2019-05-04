import React from 'react';
import { compose } from 'recompose';
import { consumerSocket } from '../Socket/context';

// import Lobby from '../Lobby';
// import Slapjack from '../Lobby';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      players: []
    };
  }

  componentDidMount = () => {
    const { socket } = this.props;

    // socket.on('Welcome to Slapjack', () => alert('hello'));

    socket.on('Player connected', (param) => {
      this.setState({
        players: [...this.state.players, param]
      });
      console.log('Player connected ' + param);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>Hello {this.props.socket.query.slice(5)}, </div>
        <h1>Welcome to Slapjack</h1>

        {Array.map(this.state.players, (value, index) => (
          <span key={index}>{value}</span>
        ))}
      </React.Fragment>
    );
  }
}

export default compose(consumerSocket)(Navigation);
