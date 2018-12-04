import sendFeedback from '../sendFeedback';
import {getHelpMsg, alreadySolvedMsg} from '../interactiveComponents';

const handleKeypadClick = dependencies => () => {
  const {
    postEphemeral,
    storage,
    clicked,
    timestamp,
    username,
    handleStorageErr,
  } = dependencies;
  const handleErr = err => handleStorageErr(err, handleKeypadClick(dependencies));
  storage.get(async (err, data = {}) => {
    if (err) return handleErr(err);
    if (clicked === 'help') return postEphemeral(getHelpMsg(data.botname));
    let currentGame = data.games[timestamp][username];
    if (!currentGame)
      currentGame = data.games[timestamp][username] = {guess: '', guesses: 0, solved: false};
    let {guess, solved: alreadySolved} = currentGame;
    // if user clicks the keypad but has already solved it, send a msg letting them know
    if (alreadySolved) return postEphemeral(alreadySolvedMsg);
    // only register click if user's guess doesn't already include the number
    // (there are no duplicates in the solutions)
    if (guess.includes(clicked)) return;
    guess += clicked;
    currentGame.guess = guess;
    // when user completes a guess, compare with the solution and send feedback; if they guessed correctly, send a congratulatory message (๑˃̵ᴗ˂̵)و
    if (guess.length === 3) await sendFeedback({data, dependencies, currentGame});
    storage.set(data, handleErr);
  });
};

export default handleKeypadClick;
