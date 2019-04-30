/**
 *
 */
class Player {
  /**
   *
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
