/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
class Player {
  /**
   * Initializes the variables
   */

  constructor() {
    this.playerCards = [];
  }

  numOfCards() {
    return this.playerCards.size();
  }

  addToHand(card) {
    this.playerCards.push(card);
  }

  removeFromHand() {
    return this.playerCards.pop();
  }
}

export default Player;
