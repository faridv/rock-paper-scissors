import Player from './player.js';
import Scoreboard from './scoreboard.js';
import { toggleSide, hideElement, showSelectedMove } from './helpers.js';

/*!
 * This file contains the main class of the project
 * It gets instantiated by starting a new game or loading a saved game
 */
export default class Game {

  /*
   * In case another move might be added in future! For example: fire!
   * You will get the joke if you've seen Friends :)
   * https://tenor.com/view/friends-joey-tribbiani-i-win-pay-up-ross-geller-gif-15694234
   */
  validHands = ['rock', 'paper', 'scissors'];

  /*
   * The three official rule of winning the game
   * It is not hardcoded in the method in case the rules change in the future :)
   */
  winningHands = [
    'rock, scissors',
    'paper, rock',
    'scissors, paper',
  ];

  /*
   * These properties hold the instances of Player and Scoreboard classes
   */
  player1;
  player2;
  scoreboard;

  /*
   * Constructor receives the player data in order to load a saved game
   * If the data is loaded from saved game, a new messages appears.
   */
  constructor(players, loaded) {
    this.player1 = new Player(players[0]);
    this.player2 = new Player(players[1]);
    this.scoreboard = new Scoreboard([this.player1, this.player2]);
    if (loaded) {
      this.scoreboard.setMessage('Let\'s Continue!');
      hideElement('#start-modal');
    } else {
      this.scoreboard.setMessage('Let\'s Play!');
    }
  }

  /*
   * First player is the left-hand-side player, thus I disable right side to prevent cheating
   */
  start() {
    toggleSide('right', false);
    hideElement('#start-modal');
  }

  /*
   * This method gets called after each move
   * If the played turn is not valid it throws an exception
   * The rest of the code is like describing the logic to a 7-year-old; Simple yet Stupid!
   */
  play(hand, player) {
    if (!this.validHands.includes(hand)) {
      throw new Error('Invalid hand');
    }
    if (player === 1) {
      this.player1.setHand(hand);
      showSelectedMove(hand, 'left');
      if (this.player2.type === 'computer') {
        const computerHand = this.computerPlay();
        showSelectedMove(computerHand, 'right');
        this.scoreboard.setScore(this.compareHands(this.player1, this.player2));
      } else {
        toggleSide('right', true);
        toggleSide('left', false);
      }
    } else if (player === 2) {
      this.player2.setHand(hand);
      showSelectedMove(hand, 'right');
      toggleSide('right', false);
      toggleSide('left', true);
      this.scoreboard.setScore(this.compareHands(this.player1, this.player2));
    }
  }

  /*
   * Computer randomly selects one of the valid hand moves
   */
  computerPlay() {
    const hand = this.validHands[Math.floor(Math.random() * this.validHands.length)];
    this.player2.setHand(hand);
    return hand;
  }

  /*
   * I take a simplified version of scoreboard state and save it as a string in localStorage
   * Later, I can use the saved data to load an existing game.
   * A message is also shown to indicate that data is saved.
   */
  save() {
    const dataToSave = [
      {
        name: this.player1.name,
        type: this.player1.type,
        score: this.player1.score,
      },
      {
        name: this.player2.name,
        type: this.player2.type,
        score: this.player2.score,
      }
    ];
    localStorage.setItem('game', JSON.stringify(dataToSave));
    this.scoreboard.setMessage('Game Saved!');
  }

  // Reset the scoreboard
  reset() {
    this.scoreboard.reset();
  }

  /*
  Result can be one of 0, 1, and 2
  0 means tie
  1 means player1 won the hand
  2 means player2 won the hand
   */
  compareHands(player1, player2) {
    if (player1.hand === player2.hand) {
      return 0;
    }
    if (this.winningHands.includes(`${player1.hand}, ${player2.hand}`)) {
      return 1;
    }
    return 2;
  }

}
