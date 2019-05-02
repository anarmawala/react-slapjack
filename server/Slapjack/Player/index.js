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

  /**
   *
   * @return {int} number of cards in player's hand
   */
  numOfCards() {
    return this.playerCards.size();
  }

  /**
   *
   * @param {*} card that will be added to the player's hand
   */
  addToHand(card) {
    this.playerCards.push(card);
  }

  /**
   *
   * @return {Card} the first card in players hand
   */
  removeFromHand() {
    return this.playerCards.pop();
  }
}

export default Player;
