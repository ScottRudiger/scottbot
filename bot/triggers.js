/* eslint implicit-arrow-linebreak: ["error", "below"] */
const msgContainsPineapple = ({text}) =>
  /pineapple|🍍/i.test(text);

const message = ({text}) =>
  text || '';

const reactionAdded = ({type}) =>
  type === 'reaction_added';

export {
  msgContainsPineapple,
  message,
  reactionAdded,
};
