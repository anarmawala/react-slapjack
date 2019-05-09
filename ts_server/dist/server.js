"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 4000;
// library imports
const cors = require("cors");
const express = require("express");
// classes imports
const Slapjack_1 = require("./Slapjack");
// setup the app
const app = express();
app.set('port', process.env.PORT || PORT);
app.use(cors());
const game = new Slapjack_1.default();
// make the server and bind it to the app
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connect', (socket) => {
    const name = socket.handshake.query.name;
    const id = socket.id;
    console.log('Connection established with ' + name);
    if (game.newPlayer(id, name)) {
        // ? send the existing list to they can see who is in lobby
        socket.emit('Existing players', game.players
            .filter((player) => player.id !== id)
            .map((player) => player.name));
        // ? let everyone know that a knew player connected
        io.emit('Player connected', name);
        if (game.gameStarted) {
            io.emit('Game started');
            game.players.forEach((player) => {
                const index = game.getPlayerIndex(player.id);
                let arr = [...game.players];
                for (let i = 0; i < index; i++) {
                    arr.push(arr.shift());
                }
                io.to(player.id).emit('number cards', arr.map((p) => {
                    let obj = {
                        name: p.name,
                        cards: p.length
                    };
                    return obj;
                }));
                io.to(player.id).emit('turn', arr.map((p) => p.id === game.players[game.turnCounter].id));
            });
        }
    }
    else {
        // ? there are already four players
        socket.emit('Fullhouse');
        socket.disconnect(true);
    }
    // ? if someone leaves, reset the game and let everyone know
    socket.on('disconnect', () => {
        game.reset(id);
        socket.broadcast.emit('Player disconnected', game.players.map((player) => player.name));
        socket.broadcast.emit('Reset');
    });
    socket.on('play', () => {
        game.playHand(id);
        game.players.forEach((player) => {
            const index = game.getPlayerIndex(player.id);
            let arr = [...game.players];
            for (let i = 0; i < index; i++) {
                arr.push(arr.shift());
            }
            io.to(player.id).emit('number cards', arr.map((p) => {
                let obj = {
                    name: p.name,
                    cards: p.length
                };
                return obj;
            }));
            io.to(player.id).emit('turn', arr.map((p) => p.id === game.players[game.turnCounter].id));
        });
        io.emit('middle', game.pile);
        let winner = game.players.filter((p) => p.length !== 0);
        if (winner.length === 1) {
            io.emit('winner', winner[0].name);
        }
    });
    socket.on('slap', () => {
        game.slapHand(id);
        game.players.forEach((player) => {
            const index = game.getPlayerIndex(player.id);
            let arr = [...game.players];
            for (let i = 0; i < index; i++) {
                arr.push(arr.shift());
            }
            io.to(player.id).emit('number cards', arr.map((p) => {
                let obj = {
                    name: p.name,
                    cards: p.length
                };
                return obj;
            }));
            io.to(player.id).emit('turn', arr.map((p) => p.id === game.players[game.turnCounter].id));
        });
        let winner = game.players.filter((p) => p.length !== 0);
        io.emit('middle', game.pile);
        if (winner.length === 1) {
            io.emit('winner', winner[0].name);
        }
    });
});
// start our simple server up on localhost:PORT
const server = http.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
// References
// io.to(`${socketId}`).emit('hey', 'I just met you');
//# sourceMappingURL=server.js.map