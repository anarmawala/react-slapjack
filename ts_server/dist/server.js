"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 4000;
// library imports
const express = require("express");
const cors = require("cors");
// classes imports
const slapjack_1 = require("./Slapjack/slapjack");
// setup the app
const app = express();
app.set('port', process.env.PORT || PORT);
app.use(cors());
const game = new slapjack_1.default();
// make the server and bind it to the app
let http = require('http').Server(app);
let io = require('socket.io')(http);
io.on('connect', (socket) => {
    const name = socket.handshake.query.name;
    const id = socket.handshake.query.t;
    console.log('Connection established with ' + name);
    if (game.newPlayer(id, name)) {
        //? send the existing list to they can see who is in lobby
        socket.emit('Existing players', game.players
            .filter((player) => player.id !== id)
            .map((player) => player.name));
        //? let everyone know that a knew player connected
        io.emit('Player connected', name);
        if (game.gameStarted) {
            io.emit('Game started');
            console.log('h');
        }
    }
    else {
        //? there are already four players
        socket.emit('Fullhouse');
        socket.disconnect(true);
    }
    //? if someone leaves, reset the game and let everyone know
    socket.on('disconnect', () => {
        game.reset(id);
        socket.broadcast.emit('Player disconnected', game.players.map((player) => player.name));
        socket.broadcast.emit('Reset');
    });
});
// start our simple server up on localhost:PORT
const server = http.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
//# sourceMappingURL=server.js.map