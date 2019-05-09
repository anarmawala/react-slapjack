"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
const rank_1 = require("./rank");
const suites_1 = require("./suites");
// this algorithm was taken from StackOverflow
// URL: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// User: cocco and Community
const fisherYatesAlgo = (array) => {
    var count = array.length, randomnumber, temp;
    while (count) {
        randomnumber = (Math.random() * count--) | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp;
    }
};
class Deck extends Array {
    constructor(shouldFill) {
        super();
        if (shouldFill) {
            for (let rank in rank_1.default) {
                for (let suite in suites_1.default) {
                    this.push(new card_1.default(suites_1.default[suite], rank_1.default[rank]));
                }
            }
            fisherYatesAlgo(this);
        }
    }
    shouldSlap() {
        if (this[this.length - 1].isJack)
            return true;
        else if (this.length < 3)
            return false;
        else
            return this[this.length - 1].rank === this[this.length - 3].rank;
    }
}
exports.default = Deck;
//# sourceMappingURL=index.js.map