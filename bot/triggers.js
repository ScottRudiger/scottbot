/* eslint-disable implicit-arrow-linebreak */
const msgContainsPineapple = ({text}) =>
  /pineapple|🍍/i.test(text);

const message = ({text}) =>
  text || '';

const reactionAdded = ({type}) =>
  type === 'reaction_added';

const playGame = ({type, text}) => // vague so user has easier time triggering
  type === 'app_mention' && text.includes`play`;

const gameStarted = ({type, subtype, text}) =>
  type === 'message' && subtype === 'bot_message' && text === 'let\'s play!';

const keypadClick = ({type, callbackId}) =>
  type === 'interactive_message' && callbackId === 'keypad';

const playAgain = ({type, callbackId}) =>
  type === 'interactive_message' && callbackId === 'play_again';

const showRankings = ({type, text}) => // vague so user has easier time triggering
  type === 'app_mention' && [/show/g, /rank/g].some(regex => regex.test(text));

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
  showRankings,
  showHelp,
  hideHelp,
};
