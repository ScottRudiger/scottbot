/* eslint implicit-arrow-linebreak: ["error", "below"] */
const msgContainsPineapple = ({text}) =>
  /pineapple|🍍/i.test(text);

const message = ({text}) =>
  text || '';

const reactionAdded = ({type}) =>
  type === 'reaction_added';

const playGame = ({type, text}) =>
  type === 'app_mention' && text.includes`play guess-the-combo`;

const gameStarted = ({type, subtype, text}) =>
  type === 'message' && subtype === 'bot_message' && text === 'let\'s play!';

const keypadClick = ({type, callbackId}) =>
  type === 'interactive_message' && callbackId === 'keypad';

const playAgain = ({type, callbackId}) =>
  type === 'interactive_message' && callbackId === 'play_again';

const showHelp = ({type, text}) =>
  type === 'app_mention' && text.includes`help`;

const hideHelp = ({type, callbackId}) =>
  type === 'interactive_message' && callbackId === 'hide_help';

export {
  msgContainsPineapple,
  message,
  reactionAdded,
  playGame,
  gameStarted,
  keypadClick,
  playAgain,
  showHelp,
  hideHelp,
};
