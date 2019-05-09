const PORT = 4000;

// library imports
import * as express from 'express';
import * as cors from 'cors';

// classes imports
import Slapjack from './Slapjack';

// setup the app
const app = express();
app.set('port', process.env.PORT || PORT);
app.use(cors());

const game = new Slapjack();

// make the server and bind it to the app
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connect', (socket: any) => {
  const name = socket.handshake.query.name;
  const id = socket.id;
  console.log('Connection established with ' + name);

  if (game.newPlayer(id, name)) {
    //? send the existing list to they can see who is in lobby
    socket.emit(
      'Existing players',
      game.players
        .filter((player) => player.id !== id)
        .map((player) => player.name)
    );

    //? let everyone know that a knew player connected
    io.emit('Player connected', name);

    if (game.gameStarted) {
      io.emit('Game started');
    }
  } else {
    //? there are already four players
    socket.emit('Fullhouse');
    socket.disconnect(true);
  }

  //? if someone leaves, reset the game and let everyone know
  socket.on('disconnect', () => {
    game.reset(id);
    socket.broadcast.emit(
      'Player disconnected',
      game.players.map((player) => player.name)
    );

    socket.broadcast.emit('Reset');
  });
});

// start our simple server up on localhost:PORT
const server = http.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

// References
// io.to(`${socketId}`).emit('hey', 'I just met you');
