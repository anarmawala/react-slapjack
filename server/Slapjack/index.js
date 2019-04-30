/**
 * Slapjack
 *
 * Holds all the logic for the game
 */
class Slapjack {
  /**
   * Initializes the variables
   */
  constructor() {
    this.players = [];
    this.table = [];
  }

  /**
   * players
   *
   * @return {Player[]} the array of players
   */
  get players() {
    return this.players;
  }

  /**
   * @return {number} number of players in the game
   */
  numPlayers() {
    return this.players.size();
  }
}

export default Slapjack;
