import React from 'react';
import { compose } from 'recompose';
import wordsToNumbers from 'words-to-numbers';

import { consumerSocket } from '../Socket/context';

class Slapjack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      turn: [],
      middle: []
    };
  }

  componentDidMount = () => {
    const { socket } = this.props;

    socket.on('number cards', (param) => {
      this.setState({
        cards: [...param]
      });

      // console.log(param);
    });

    socket.on('turn', (param) => {
      this.setState({
        turn: [...param]
      });

      // console.log(param);
    });

    socket.on('middle', (param) => {
      this.setState({
        middle: [...param]
      });

      // console.log(param);
    });

    window.addEventListener('keypress', this.handleSend);
  };

  handleSend = (e) => {
    // 32 space - play
    // 13 enter - slap

    if (e.keyCode === 32) {
      this.props.socket.emit('play');
    } else if (e.keyCode === 13) {
      this.props.socket.emit('slap');
    }
  };

  render() {
    const { cards, turn, middle } = this.state;
    return (
      <React.Fragment>
        <div>SPACE for play || ENTER for slap</div>
        <br />
        {cards.length === turn.length && cards.length === 4 && (
          <React.Fragment>
            {cards[0].name + ' ' + cards[0].cards}
            <img src={require('./images/blue_back.png')} width="80" alt="" />

            <br />
            {cards[1].name + ' ' + cards[1].cards}
            <img src={require('./images/blue_back.png')} width="80" alt="" />

            {cards[2].name + ' ' + cards[2].cards}
            <img src={require('./images/blue_back.png')} width="80" alt="" />

            <br />
            {cards[3].name + ' ' + cards[3].cards}
            <img src={require('./images/blue_back.png')} width="80" alt="" />

            {turn !== null && turn[0] === true && <span>Your Turn</span>}
            {middle.length > 0 ? (
              <img
                src={require('./images/' +
                  (!isNaN(wordsToNumbers(middle[middle.length - 1].rank))
                    ? wordsToNumbers(middle[middle.length - 1].rank)
                    : middle[middle.length - 1].rank.slice(0, 1)) +
                  middle[middle.length - 1].suite.slice(0, 1) +
                  '.png')}
                width="80"
                alt=""
              />
            ) : (
              <img src={require('./images/blue_back.png')} width="80" alt="" />
            )}
            {middle.length}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default compose(consumerSocket)(Slapjack);
