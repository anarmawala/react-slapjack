public class Card {
    Suite suite;
    Rank  rank;
    
    Card (Suite s, Rank r) {
        this.suite = s;
        this.rank  = r;
    }
    
    boolean isJack () {
        return rank == Rank.Jack;
    }
}
