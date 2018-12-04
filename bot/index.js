import injectDependencies from './injectDependencies';

export default ({secrets: {SLACK_TOKEN}, storage}, req, res) => {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    const {
      trigger,
      addReaction,
      parrotReaction,
    } = injectDependencies({SLACK_TOKEN, storage, data});

    // add a :pineapple: reaction to any message that includes 'pineapple' or '🍍'
    if (trigger.msgContainsPineapple) addReaction('pineapple');

    // add a reaction for any word in a message that is also a reaction; e.g., given the message 'I ate an apple.' the bot will react with :apple:; will also parrot any emojis included in a message; e.g., 'I 💙 JS' will produce a 💙 reaction
    trigger.message.split(/\s|[^\w-]/).filter(Boolean).forEach(
      word => addReaction(word.toLowerCase()),
    );

    // add a reaction for every reaction a user adds to a message (limit 1 per message per type of reaction)
    if (trigger.reactionAdded) parrotReaction();
  });
  res.end();
};
