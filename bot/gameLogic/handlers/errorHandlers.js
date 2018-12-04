/* eslint-disable no-console */
let attempts = 3;
const getStorageErrHandler = postEphemeral => (err, handler) => {
  if (err && attempts--) handler();
  else if (err) {
    console.error(err);
    postEphemeral('Oops! It looks like something went wrong. Please try that again.');
  }
};

const handleSlackErr = err => {
  console.error(err);
};

export {
  getStorageErrHandler,
  handleSlackErr,
};
