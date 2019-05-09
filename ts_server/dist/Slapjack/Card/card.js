"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rank_1 = require("./rank");
class Card {
    constructor(s, r) {
        this.isJack = () => {
            return this.rank === rank_1.default.Jack;
        };
        this.suite = s;
        this.rank = r;
    }
}
exports.default = Card;
//# sourceMappingURL=card.js.map