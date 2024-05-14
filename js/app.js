import Game from './game.js';
import { getPlayerData } from './helpers.js';

/*!
 * This file is the main entry of the project.
 * It attaches an event-listener to all buttons in app and then handles the event to happen based on the button data
 * Each button has an `data-type` attribute that describes its role
 */

let game;

// Event listener on all buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (event) => {
    handleEvent(event);
  })
);

// handle the button click event based on the button data attributes
function handleEvent(event) {
  event.preventDefault();
  const button = event.target;
  const type = button.dataset.type;
  switch (type) {
    // Game Actions
    case 'start_multi':
      game = new Game(getPlayerData());
      game.start();
      break;
    case 'start_single':
      let [player1, player2] = getPlayerData();
      game = new Game([player1, { ...player2, type: 'computer' }])
      game.start();
      break;
    case 'play':
      game.play(button.dataset.hand, parseInt(button.dataset.player, 10));
      break;
    // Saving and Loading Actions
    case 'load':
      const savedData = JSON.parse(localStorage.getItem('game'));
      if (savedData) {
        game = new Game(savedData, true);
        game.start();
      } else {
        alert('No saved data found');
      }
      break;
    case 'save':
      game.save();
      break;
    case 'reset':
      game.reset();
      break;
  }
}
