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

export {
  msgContainsPineapple,
  message,
  reactionAdded,
  playGame,
  gameStarted,
};
