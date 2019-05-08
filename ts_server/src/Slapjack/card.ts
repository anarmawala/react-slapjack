import Suite from './suites';
import Rank from './rank';

class Card {
  public suite: Suite;
  public rank: Rank;

  public constructor(s: Suite, r: Rank) {
    this.suite = s;
    this.rank = r;
  }

  public isJack = () => {
    return this.rank === Rank.Jack;
  };
}

export default Card;
