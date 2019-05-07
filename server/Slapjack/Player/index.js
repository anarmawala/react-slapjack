'use strict';

/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
const Player = class {
  /**
   * Initializes the variables
   *
   * @param {string} _id the given id
   * @param {string} _userName  the given username
   * @param {Socket} _socket  the socket for the player
   */
  constructor(_id, _userName, _socket) {
    // identifiers
    this.id = _id;
    this.userName = _userName;
    this.socket = [];
    this.playerCards = [];
  }

  /**
   *
   * @return {int} number of cards in player's hand
   */
  numOfCards() {
    return this.playerCards.size();
  }

  /**
   *
   * @param {Card} card that will be added to the player's hand
   */
  addToHand(card) {
    // this.playerCards.push(card);
    this.playerCards = [card].concat(this.playerCards);
  }

  /**
   *
   * @return {Card} the first card in players hand
   */
  removeFromHand() {
    return this.playerCards.pop();
  }
};

module.exports = Player;
