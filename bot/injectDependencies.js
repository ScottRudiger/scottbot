import parse from './parse';
import getHandlers from './gameLogic/getHandlers';
import {handleSlackErr, getStorageErrHandler} from './gameLogic/handlers/errorHandlers';
import {
  getRequestDefaults,
  postToEphemeralUri,
  applyToTriggers,
  postToReactionUri,
} from './helpers';

const injectDependencies = ({SLACK_TOKEN, storage, data}) => {
  const parsedData = parse(data);
  const {post} = getRequestDefaults(SLACK_TOKEN);
  const addReaction = postToReactionUri({post, ...parsedData});
  const postEphemeral = postToEphemeralUri({post, ...parsedData});
  /**
   * @param {any} err the error passed through from Webtask storage get/set
   * @param {Function} handler the code path to retry in case of error
   * @returns {undefined}
   */
  const handleStorageErr = getStorageErrHandler(postEphemeral);
  return {
    trigger: applyToTriggers(parsedData),
    addReaction,
    parrotReaction: () => addReaction(parsedData.reaction).catch(handleSlackErr),
    handle: getHandlers({
      post,
      storage,
      postEphemeral,
      handleStorageErr,
      handleSlackErr,
      ...parsedData,
    }),
  };
};

export default injectDependencies;
