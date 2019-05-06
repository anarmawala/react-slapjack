const Card = class {
  /**
   * Initializes the value
   * @param {string} _suite
   * @param {string} _rank
   */
  constructor(_suite, _rank) {
    this.suite = _suite;
    this.rank = _rank;
  }

  /**
   *
   * @return {bool} if card if a jack
   */
  isJack() {
    return rank === 'JACK';
  }
};

module.exports = Card;
