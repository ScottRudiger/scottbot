import injectDependencies from './injectDependencies';

export default ({secrets: {SLACK_TOKEN}, storage}, req, res) => {
  let data = '';
  req.on('data', chunk => { data += chunk; });
  req.on('end', () => {
    const {
      trigger,
      handle,
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

    /* guess-the-combo game */

    // when user mentions '@<botname> play guess-the-combo' send an interactive message to start the game
    if (trigger.playGame) handle.playGame();

    // after a game is started, create a random combination for users to guess
    if (trigger.gameStarted) handle.gameStarted();

    // handle clicks on the keypad (e.g., 1-9 or 'help'); see bot/gameLogic/handlers/keypadClick.js for more
    if (trigger.keypadClick) handle.keypadClick();
  });
  res.end();
};
