/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
class Player {
	
	/**
    * Initializes the variables
    */
	Player(id) {
		this.id = id;	  
	}
  
	set name(name) {
		this.userName = name;
	}
	
	get name() {
		return this.userName;
	}
}


export default Player;
