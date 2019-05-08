import Card from './card';

class Player extends Array<Card> {
  public id: string;
  public name: string;

  public constructor(id: string, name: string) {
    super();

    this.id = id;
    this.name = name;
  }
}

export default Player;
