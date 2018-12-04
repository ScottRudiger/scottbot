import playGame from './handlers/playGame';
import gameStarted from './handlers/gameStarted';
import keypadClick from './handlers/keypadClick';

export default dependencies => ({
  playGame: playGame(dependencies),
  gameStarted: gameStarted(dependencies),
  keypadClick: keypadClick(dependencies),
});
