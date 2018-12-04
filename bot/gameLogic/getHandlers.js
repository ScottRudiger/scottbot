import playGame from './handlers/playGame';

export default dependencies => ({
  playGame: playGame(dependencies),
});
