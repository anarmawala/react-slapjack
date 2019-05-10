import React from 'react';
import { compose } from 'recompose';
import wordsToNumbers from 'words-to-numbers';

import { consumerSocket } from '../Socket/context';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = (theme) => ({
  control: {
    padding: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
    width: 60,
    height: 60
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    width: 60,
    height: 60
  }
});

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

    socket.on('winner', (param) => {
      alert('And the winner is ......');
      alert(param);

      window.location = '/';
      // console.log(param);
    });

    window.addEventListener('keypress', this.handleSend);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keypress');
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        {cards.length === turn.length && cards.length === 4 && (
          <Grid container className={classes.root} spacing={40}>
            <Grid item lg={12} xs={12}>
              <Grid
                container
                className={classes.demo}
                justify="center"
                spacing={Number(16)}>
                <Grid item lg={12} xs={12}>
                  <Badge
                    className={classes.margin}
                    badgeContent={cards[0].cards}
                    color="primary">
                    <Avatar className={classes.avatar}>
                      {cards[0].name.slice(0, 3)}
                    </Avatar>
                  </Badge>
                  <Badge
                    className={classes.margin}
                    badgeContent={cards[1].cards}
                    color="primary">
                    <Avatar className={classes.orangeAvatar}>
                      {cards[1].name.slice(0, 3)}
                    </Avatar>
                  </Badge>
                  <Badge
                    className={classes.margin}
                    badgeContent={cards[2].cards}
                    color="primary">
                    <Avatar className={classes.purpleAvatar}>
                      {cards[2].name.slice(0, 3)}
                    </Avatar>
                  </Badge>
                  <Badge
                    className={classes.margin}
                    badgeContent={cards[3].cards}
                    color="primary">
                    <Avatar className={classes.orangeAvatar}>
                      {cards[3].name.slice(0, 3)}
                    </Avatar>
                  </Badge>
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Badge
                    className={classes.margin}
                    badgeContent={middle.length}
                    color="primary">
                    {middle.length > 0 ? (
                      <img
                        src={require('./images/' +
                          (!isNaN(
                            wordsToNumbers(middle[middle.length - 1].rank)
                          )
                            ? wordsToNumbers(middle[middle.length - 1].rank)
                            : middle[middle.length - 1].rank.slice(0, 1)) +
                          middle[middle.length - 1].suite.slice(0, 1) +
                          '.png')}
                        width="300"
                        alt=""
                      />
                    ) : (
                      <img
                        src={require('./images/blue_back.png')}
                        width="300"
                        alt=""
                      />
                    )}
                  </Badge>
                  <br />
                  {turn !== null && turn[0] === true && <span>Your Turn</span>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  consumerSocket
)(Slapjack);

{
  /* <React.Fragment>
  <div>SPACE for play || ENTER for slap</div>
  <br />
  {cards.length === turn.length && cards.length === 4 && (
    <React.Fragment>
      <table>
        <tr>
          <td>
            {cards[1].name + ' has ' + cards[1].cards + ' cards'} <br />
            {cards[0].name + ' has ' + cards[0].cards + ' cards'} <br />
            {cards[2].name + ' has ' + cards[2].cards + ' cards'} <br />
            {cards[3].name + ' has ' + cards[3].cards + ' cards'} <br />
          </td>
          <br />
          <td>
            {turn !== null && turn[0] === true && <span>Your Turn</span>}
            {middle.length > 0 ? (
              <img
                src={require('./images/' +
                  (!isNaN(wordsToNumbers(middle[middle.length - 1].rank))
                    ? wordsToNumbers(middle[middle.length - 1].rank)
                    : middle[middle.length - 1].rank.slice(0, 1)) +
                  middle[middle.length - 1].suite.slice(0, 1) +
                  '.png')}
                width="200"
                alt=""
              />
            ) : (
              <img src={require('./images/blue_back.png')} width="200" alt="" />
            )}
            {middle.length}
          </td>
        </tr>
      </table>
    </React.Fragment>
  )}
</React.Fragment>; */
}
