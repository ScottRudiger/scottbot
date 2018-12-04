/* eslint implicit-arrow-linebreak: ["error", "below"] */
const msgContainsPineapple = ({text}) =>
  /pineapple|🍍/i.test(text);

export {
  msgContainsPineapple,
};
