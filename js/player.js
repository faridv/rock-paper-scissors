/* 
 * The initial default values for each player object are later merged with the given data.
 * If a property is missing, the default value will be used.
 */
const defaultPlayerData = {
  name: 'Player',
  hand: '',
  score: 0,
};

/*
 * This class is responsible for handling each player's state
 * After instantiating, it is possible to set the latest move/hand of the player and its score.
 */
export default class Player {

  hand;
  score;
  name;
  type;

  constructor(playerData) {
    this.name = playerData.name || defaultPlayerData.name;
    this.hand = playerData.hand || defaultPlayerData.hand;
    this.score = playerData.score || defaultPlayerData.score;
    this.type = playerData.type || 'human';
  }

  setHand(hand) {
    this.hand = hand;
  }

  setScore(score) {
    this.score = score;
  }

}
