/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
class Player {
  /**
   * Initializes the variables
   */
<<<<<<< HEAD

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
=======
  Player() {}
>>>>>>> 3f4d5556d2763d9e8287fbc6ab4cbc81d70f159d
}

export default Player;
