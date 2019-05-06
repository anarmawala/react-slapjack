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
