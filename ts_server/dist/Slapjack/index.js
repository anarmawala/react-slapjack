"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Deck_1 = require("./Deck");
class Slapjack {
    constructor() {
        this.newPlayer = (id, name) => {
            if (!this.gameStarted) {
                this.players.push(new Player_1.default(id, name));
                // stopping additional players from joining
                if (this.players.length === 4) {
                    this.startGame();
                }
                return true;
            }
            else {
                return false;
            }
        };
        this.startGame = () => {
            this.gameStarted = true;
            const initCard = new Deck_1.default(true);
            while (initCard.length >= 4) {
                this.players.forEach((player) => {
                    player.push(initCard.pop());
                });
            }
        };
        this.gameStarted = false;
        this.turnCounter = 0;
        this.pile = new Deck_1.default(false);
        this.players = new Array();
    }
    playHand(id) {
        const index = this.players.findIndex((player) => {
            return id == player.id;
        });
        if (this.turnCounter == index) {
            this.pile.push(this.players[index].pop());
            do {
                this.turnCounter += 1;
                if (this.turnCounter == 4)
                    this.turnCounter = 0;
            } while (this.players[this.turnCounter].length <= 0);
        }
        else if (this.players[index].length > 0) {
            this.pile.unshift(this.players[index].pop());
        }
    }
    slapHand(id) {
        const index = this.players.findIndex((player, index, obj) => {
            return id === player.id;
        });
        if (this.pile.shouldSlap() === true) {
            while (this.pile.length > 0) {
                this.players[index].unshift(this.pile.pop());
            }
            this.turnCounter = index;
        }
        else {
            if (this.players[index].length > 0) {
                this.pile.push(this.players[index].pop());
            }
        }
    }
    getPlayerIndex(id) {
        return this.players.findIndex((player) => {
            return id == player.id;
        });
    }
    reset(id) {
        this.gameStarted = false;
        this.pile.splice(0, this.pile.length);
        this.players = this.players.filter((player) => player.id !== id);
        this.players.forEach((player) => player.splice(0, player.length));
        this.turnCounter = 0;
    }
}
exports.default = Slapjack;
//# sourceMappingURL=index.js.map