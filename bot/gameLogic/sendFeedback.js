import {tryCombo} from './combo';
import updateRanking from './updateRanking';
import {congratulatoryMsg} from './interactiveComponents';

const sendFeedback = ({data, dependencies, currentGame}) => {
  const {timestamp, postEphemeral} = dependencies;
  const {guess} = currentGame;
  const {solution} = data.games[timestamp];
  // compare user's guess w/ the solution and get feedback
  const feedback = tryCombo(guess, solution);
  const guessedCorrectly = feedback['✅'] === 3;
  // send feedback
  return postEphemeral(`${guess} ✅: ${feedback['✅']} ⚠️: ${feedback['⚠️']}`).then(() => {
    currentGame.guess = '';
    currentGame.guesses++;
    // then, if they solved it
    if (guessedCorrectly) {
      currentGame.solved = true;
      // update both the current game ranking and the overall ranking
      updateRanking({data, ...dependencies, currentGame});
      // and send a congratulatory message!!!
      postEphemeral(...congratulatoryMsg);
    }
  });
};

export default sendFeedback;
