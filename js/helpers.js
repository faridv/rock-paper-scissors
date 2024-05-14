/*!
 * This file contains some helper functions that are used in different parts of the project
 */

/*
 * Simple function to change the text content of an HTML element to the given value
 */
export function setElementText(element, value) {
  document.querySelector(element).innerText = value;
}

/*
 * Simple helper function to hide an HTML element
 */
export function hideElement(element) {
  document.querySelector(element).style.display = 'none';
}

export function toggleSide(side, on) {
  const $side = document.querySelector(`.${side}-side`);
  $side.style.opacity = on ? '1' : '0.5';
  $side.style.pointerEvents = on ? 'auto' : 'none';
}

/*
 * Show the selected move, as fast as possible
 * Useful when playing with Computer
 */
export function showSelectedMove(hand, side) {
  const $element = document.querySelector(`.choices.${side}-side .selected`);
  $element.innerText = convertHandToEmoji(hand);
  $element.style.opacity = '1';
  $element.style.visibility = 'visible';
  setTimeout(() => {
    $element.style.opacity = '0';
    $element.style.visibility = 'hidden';
  }, 300);
}

/*
 * Convert game move to correspondent emoji
 * Used in showing selected hand
 */
export function convertHandToEmoji(hand) {
  switch (hand) {
    case 'rock':
      return '👊';
    case 'paper':
      return '✋';
    case 'scissors':
      return '✌️';
    case 'fire':
      return '🔥';
    case 'water':
      return '💦';
    default:
      return '';
  }
}

/*
 * Read the initial form data containing player names
 */
export function getPlayerData() {
  return [
    { name: document.querySelector('#player_1').value || 'Player 1' },
    { name: document.querySelector('#player_2').value || 'Player 2' }
  ];
}
