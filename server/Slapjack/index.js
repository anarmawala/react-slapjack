const Deck = require('./Deck');

/**
 * Slapjack
 *
 * Holds all the logic for the game
 */
const Slapjack = class {
  /**
   * Initializes the variables
   */
  constructor() {
    this.players = [];
    this.inGame = false;
    this.cardPile = new Deck(true);
    this.table = [];
  }

  /**
   * Adds reference to a player to list of players
   *
   * @param {Player} player - to add to the list of players
   */
  addPlayer(player) {
    if (!this.inGame) {
      this.players.push(player);

      if (this.players.length === 4) {
        const deck = new Deck(false);

        do {
          this.players[0].addToHand(deck.cards.pop());
          this.players[1].addToHand(deck.cards.pop());
          this.players[2].addToHand(deck.cards.pop());
          this.players[3].addToHand(deck.cards.pop());
        } while (deck.cards.length > 0);
        this.inGame = true;
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  playHand(id) {
    const index = this.players.findIndex((player, index, obj) => {
      return id == player.id;
    });
    console.log(this.players[index]);
    this.cardPile.cards.push(this.players[index].removeFromHand());
  }

  // eslint-disable-next-line require-jsdoc
  slapHand(id) {
    const index = this.players.findIndex((player, index, obj) => {
      return id == player.id;
    });

    console.log(this.players[index]);
    if (this.cardPile.shouldSlap === true) {
      while (this.cardPile.cards.length > 0) {
        this.players[index].addToHand(this.cardPile.cards.pop());
      }
    } else {
      if (this.players[index].playerCards.length > 0) {
        this.cardPile.cards.push(this.players[index].playerCards.pop());
      }
    }
    console.log(this.players[index]);
    console.log(this.cardPile);
  }
};

module.exports = Slapjack;
