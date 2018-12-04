import {getRandomCombo} from '../combo';

const handleGameStarted = dependencies => () => {
  const {
    storage,
    username,
    timestamp,
    handleStorageErr,
  } = dependencies;
  const handleErr = err => handleStorageErr(err, handleGameStarted(dependencies));
  storage.get((err, data = {games: {}, overallRanking: {}, botname: username}) => {
    if (err) return handleErr(err);
    data.games[timestamp] = {
      solution: getRandomCombo(),
      ranking: [],
    };
    storage.set(data, handleErr);
  });
};

export default handleGameStarted;
