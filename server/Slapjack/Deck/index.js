const shuffle = require('shuffle-array');
const Card = require('./Card');

const SUITES = ['SPADES', 'DIAMONDS', 'CLUBS', 'HEARTS'];
const RANKS = [
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'JACK',
  'QUEEN',
  'KING',
  'ACE',
];

const Deck = class {
  /**
   * Initializes the values
   *
   * @param {bool} empty whether initialize it empty or not
   */
  constructor(empty) {
    this.cards = [];
    if (!empty) {
      RANKS.forEach((rank, _) => {
        SUITES.forEach((suite, _) => {
          this.cards.push(new Card(suite, rank));
        });
      });

      shuffle(this.cards);
    }
  }

  /**
   * @return {bool} - whether top card is jack or not
   */
  shouldSlap() {
    if (this.cards.length > 0) return this.card[this.cards.length - 1].isJack;
    else return false;
  }
};

module.exports = Deck;
