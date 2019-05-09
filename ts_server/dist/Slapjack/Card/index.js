"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rank_1 = require("../Rank");
class Card {
    constructor(s, r) {
        this.isJack = () => {
            return this.rank === Rank_1.default.Jack;
        };
        this.suite = s;
        this.rank = r;
    }
}
exports.default = Card;
//# sourceMappingURL=index.js.map