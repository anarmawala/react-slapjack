import Card from './card';
import Rank from './rank';
import Suite from './suites';

// this algorithm was taken from StackOverflow
// URL: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// User: cocco and Community
const fisherYatesAlgo = (array: Array<any>) => {
  var count = array.length,
    randomnumber,
    temp;
  while (count) {
    randomnumber = (Math.random() * count--) | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp;
  }
};

class Deck extends Array<Card> {
  public constructor(shouldFill: boolean) {
    super();

    if (shouldFill) {
      for (let rank in Rank) {
        for (let suite in Suite) {
          this.push(new Card(Suite[suite] as Suite, Rank[rank] as Rank));
        }
      }
      fisherYatesAlgo(this);
    }
  }

  public shouldSlap() {
    if (this[this.length - 1].isJack) return true;
    else if (this.length < 3) return false;
    else return this[this.length - 1].rank === this[this.length - 3].rank;
  }
}

export default Deck;
