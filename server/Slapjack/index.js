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
    this.turn = 0;
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

  /**
   *
   * @param {*} id the id used to find a player
   */
  playHand(id) {
    const index = this.players.findIndex((player, index, obj) => {
      return id == player.id;
    });

    if (this.turn == index) {
      this.cardPile.cards.push(this.players[index].removeFromHand());
      this.turn += 1;

      if (this.turn == 4) this.turn = 0;
    } else {
      this.cardPile.cards = [this.players[index].removeFromHand()].concat(
          this.cardPile.cards
      );
    }
  }

  /**
   *
   * @param {*} id the id used to find a player
   */
  slapHand(id) {
    const index = this.players.findIndex((player, index, obj) => {
      return id == player.id;
    });

    if (this.cardPile.shouldSlap === true) {
      while (this.cardPile.cards.length > 0) {
        this.players[index].addToHand(this.cardPile.cards.pop());
      }

      this.turn = index;
    } else {
      if (this.players[index].playerCards.length > 0) {
        this.cardPile.cards.push(this.players[index].playerCards.pop());
      }
    }
  }

  /**
   * @return {int} returns the number of players
   */
  numClients() {
    return players.length;
  }
};

module.exports = Slapjack;
