import java.util.ArrayList;

public class Slapjack {
    boolean gameStarted;
    int     turnCounter;
    
    ArrayList<Player> players;
    Deck              pile;
    
    Slapjack () {
    }
    
    boolean newPlayer (String id, String name) {
        return true;
    }
    
    void startGame () {
    }
    
    void playhand (String id) {
    }
    
    void slapHand (String id) {
    }
    
    void reset (String id) {
    }
    
    int getPlayerIndex (String id) {
        return 1;
    }
}
