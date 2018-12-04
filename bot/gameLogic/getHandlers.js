import playGame from './handlers/playGame';
import gameStarted from './handlers/gameStarted';
import keypadClick from './handlers/keypadClick';
import playAgain from './handlers/playAgain';
import hideHelp from './handlers/hideHelp';

export default dependencies => ({
  playGame: playGame(dependencies),
  gameStarted: gameStarted(dependencies),
  keypadClick: keypadClick(dependencies),
  playAgain: playAgain(dependencies),
  hideHelp: hideHelp(dependencies),
});
