const defaultPlayerData = {
  name: 'Player',
  hand: '',
  score: 0,
};

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
