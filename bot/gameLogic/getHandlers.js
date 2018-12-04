import playGame from './handlers/playGame';
import gameStarted from './handlers/gameStarted';
import keypadClick from './handlers/keypadClick';
import hideHelp from './handlers/hideHelp';

export default dependencies => ({
  playGame: playGame(dependencies),
  gameStarted: gameStarted(dependencies),
  keypadClick: keypadClick(dependencies),
  hideHelp: hideHelp(dependencies),
});
