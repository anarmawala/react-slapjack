const Player = require('./player.js');
/**
 * Slapjack
 *
 * Holds all the logic for the game
 */
class Slapjack {
	/**
	* Initializes the variables
	*/
	constructor() {
		this.players = [];
		this.isGame = false;
		this.cardPile = [];
		this.table = [];
    }

	/*
	* Adds reference to a player to list of players
	*/
	addPlayer(player){
		this.players.push(player);
    }
	
	/*
	* Checks if game has four players, if yes, sets state to true
	* if no, sets state of game to false
	*/
	checkState() {
		if(numPlayers == 4) {
			isGame = true;
			return true;
		}
		else {
			isGame = false;
			return false;
		}
	}
	
	/**
	* @return {Player[]} the array of players
	*/
	get players() {
		return this.players;
	}

	/**
	* @return {number} number of players in the game
	*/
	numPlayers() {
		return this.players.size();
	}
}

export default Slapjack;
