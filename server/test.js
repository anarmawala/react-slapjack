const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const server = require('http').createServer(app);
const IOconnection = require('socket.io')(server, {});

const Player = require('./Slapjack/Player');
const Deck = require('./Slapjack/Deck');
const Slapjack = require('./Slapjack');

// const player = new Player('abcd', 'arshad');
// console.log(player.id);

// const deck = new Deck(false);
const game = new Slapjack();
game.addPlayer(new Player('1', 'Arshad'));
game.addPlayer(new Player('2', 'Jigar'));
game.addPlayer(new Player('3', 'Clark'));
game.addPlayer(new Player('4', 'Angela'));

game.playHand('4');
game.slapHand('4');

server.listen(4000);
console.log('Server starting on port 4000');

const slapjack = new Slapjack();

// socket connection: logic for communication b/w server-client goes here
IOconnection.sockets.on('connection', (socket) => {
  if (slapjack.numClients() == 4) {
    socket.emit('Fullhouse');
    socket.disconnect(true);
    return;
  }

  console.log(
      'connection established with ' +
      socket.handshake.query.name +
      ' : ' +
      slapjack.numClients()
  );

  socket.emit(
      'Existing players',
      slapjack.players().map((player) => player.socket.handshake.query.name)
  );

  IOconnection.emit('Player connected', socket.handshake.query.name);
});
