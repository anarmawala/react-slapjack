import React from 'react';
import { compose } from 'recompose';
import { consumerSocket } from '../Socket/context';

import Lobby from '../Lobby';
import Slapjack from '../Slapjack';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      players: [],
      message: ''
    };
  }

  componentDidMount = () => {
    const { socket } = this.props;

    // socket.on('Welcome to Slapjack', () => alert('hello'));

    socket.on('Player connected', (param) => {
      this.setState({
        players: [...this.state.players, param]
      });
    });

    socket.on('Player disconnected', (param) => {
      this.setState({
        players: [...param]
      });
    });

    socket.on('Existing players', (param) => {
      this.setState({
        players: [...param, ...this.state.players]
      });
    });

    socket.on('Game started', () => {
      this.setState({ gameStarted: true });
    });

    socket.on('Reset', () => {
      this.setState({ gameStarted: false });
    });

    socket.on('disconnect', () => {
      this.setState({ players: [] });
    });

    socket.on('Fullhouse', () => {
      this.setState({
        message: 'Game is already full!'
      });
    });

    socket.on('alert', () => {
      alert('REcieved');
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.gameStarted ? (
          <Slapjack />
        ) : (
          <Lobby
            name={this.props.socket.query.slice(5)}
            players={this.state.players}
            message={this.state.message}
          />
        )}
      </React.Fragment>
    );
  }
}

export default compose(consumerSocket)(Navigation);
