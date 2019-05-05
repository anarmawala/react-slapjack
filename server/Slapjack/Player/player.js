/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
class Player {
  /**
   * Initializes the variables
   *
   * @param {string} id the given id
   * @param {string} userName  the given username
   */
  Player(id, userName) {
    this.id = id;
    this.playerCards = [];
    this.userName = userName;
  }

  /**
   * input Player object, and returns id
   *
   * @param {Player} player - to use to retrieve the ID
   * @return {string} returns the id of the player
   */
  static getId(player) {
    return player.id;
  }

  /**
   * input Player object, and returns user name
   *
   * @param {Player} player - to use to retrieve the username
   * @return {string} returns the id of the username
   */
  static getName(player) {
    return player.userName;
  }

  /**
   * input Player object, and returns playing cards
   *
   * @param {Player} player - to use to retrieve the cards
   * @return {string} returns the id of the cards
   */
  static getCards(player) {
    return player.playerCards;
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
