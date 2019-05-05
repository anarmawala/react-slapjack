/*
*	Need to add class for cards 
*/
/**
 * Player
 *
 * Hold and mutates specific players and their cards
 */
class Player {
	
	/**
    * Initializes the variables
    */
	Player(id, userName) {
		this.id = id;
		this.playerCards = [];	
		this.userName = userName;
	}
	
	/*
	* input Player object, and returns id
	*/
	static getId(player) {
		return player.id;
	}
	
	/*
	* input Player object, and returns user name
	*/
	static getName(player) {
		return player.userName;
	}
	
	/*
	* input Player object, and returns playing cards
	*/
	static getCards(player){
		return player.playerCards;
	}
	
	/**
	*
	* @return {int} number of cards in player's hand
	*/
	numOfCards() {
		return this.playerCards.size();
	}
	
	/**
    *
    * @param {*} card that will be added to the player's hand
    */
    addToHand(card) {
		this.playerCards.push(card);
    }
	
	/**
    *
    * @return {Card} the first card in players hand
    */
    removeFromHand() {
		return this.playerCards.pop();
    }
}


export default Player;
