import playGame from './handlers/playGame';
import gameStarted from './handlers/gameStarted';

export default dependencies => ({
  playGame: playGame(dependencies),
  gameStarted: gameStarted(dependencies),
});
