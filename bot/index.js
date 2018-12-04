import injectDependencies from './injectDependencies';

export default ({secrets: {SLACK_TOKEN}, storage}, req, res) => {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    const {
      trigger,
      addReaction,
    } = injectDependencies({SLACK_TOKEN, storage, data});

    // add a :pineapple: reaction to any message that includes 'pineapple' or '🍍'
    if (trigger.msgContainsPineapple) addReaction('pineapple');
  });
  res.end();
};
