import { setElementText } from './helpers.js';

/*!
 * This is a simple class to handle the Scoreboard events
 * To handle saving and loading the game, I implemented a constructor method to receive initial data
 * Every time this class's data is changed, a UI change happens too.
 */

export default class Scoreboard {

  scores;
  message;

  constructor(players) {
    this.scores = {
      player1: players[0],
      player2: players[1],
    };
    this.message = '';
    this.setInitialValues(this.scores);
  }

  // Initial data on scoreboard contains player names and their scores
  setInitialValues(scores) {
    setElementText('.player_1 .name', scores.player1.name);
    setElementText('.player_1 .score', scores.player1.score);
    setElementText('.player_2 .name', scores.player2.name);
    setElementText('.player_2 .score', scores.player2.score);
  }

  /*
   * Shows the corresponding message after each turn
   * If it is not a tie, scores will change too
   */
  setScore(status) {
    switch (status) {
      case 0:
        this.setMessage('It\'s a tie!');
        break;
      case 1:
        this.scores.player1.score++;
        this.setMessage('Player 1 wins!');
        setElementText('.player_1 .score', this.scores.player1.score);
        break;
      case 2:
        this.scores.player2.score++;
        this.setMessage('Player 2 wins!');
        setElementText('.player_2 .score', this.scores.player2.score);
        break;
    }
  }

  /*
   * Resetting the game was not in the project requirements, but I realized this after writing the method
   */
  reset() {
    this.scores.player1.score = 0;
    this.scores.player2.score = 0;
    this.setInitialValues(this.scores);
    this.setMessage('Here We Go Again!');
  }

  // Simply show the message in the scoreboard UI
  setMessage(message) {
    this.message = message;
    setElementText('.message', message);
  }

}
