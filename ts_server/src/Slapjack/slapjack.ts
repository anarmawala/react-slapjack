import Player from './player';
import Deck from './deck';

class Slapjack {
  // logistics
  public gameStarted: boolean;
  public turnCounter: number;

  // players
  public players: Array<Player>;
  public pile: Deck;

  public constructor() {
    this.gameStarted = false;
    this.turnCounter = 0;

    this.pile = new Deck(false);
    this.players = new Array<Player>();
  }

  public newPlayer = (id: string, name: string) => {
    if (!this.gameStarted) {
      this.players.push(new Player(id, name));

      // stopping additional players from joining
      if (this.players.length === 4) {
        console.log('dsafjkhdksjlfhkl');
        this.startGame();
      }

      return true;
    } else {
      return false;
    }
  };

  public startGame = () => {
    this.gameStarted = true;

    const initCard = new Deck(true);

    while (initCard.length >= 4) {
      this.players.forEach((player) => {
        player.push(initCard.pop());
      });
    }
  };

  public playHand(id: string) {
    const index = this.players.findIndex((player) => {
      return id == player.id;
    });

    if (this.turnCounter == index) {
      this.pile.push(this.players[index].pop());
      this.turnCounter += 1;

      if (this.turnCounter == 4) this.turnCounter = 0;
    } else {
      this.pile.unshift(this.players[index].pop());
    }
  }

  public slapHand(id: string) {
    const index = this.players.findIndex((player, index, obj) => {
      return id === player.id;
    });

    if (this.pile.shouldSlap() === true) {
      while (this.pile.length > 0) {
        this.players[index].unshift(this.pile.pop());
      }

      this.turnCounter = index;
    } else {
      if (this.players[index].length > 0) {
        this.pile.push(this.players[index].pop());
      }
    }
  }

  public getPlayer(id: string) {
    return this.players[
      this.players.findIndex((player) => {
        return id == player.id;
      })
    ];
  }

  public reset(id: string) {
    this.gameStarted = false;
    this.pile.splice(0, this.pile.length);
    this.players = this.players.filter((player) => player.id !== id);
    this.players.forEach((player) => player.splice(0, player.length));
    this.turnCounter = 0;
  }
}

export default Slapjack;
