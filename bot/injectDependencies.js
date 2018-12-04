import parse from './parse';
import getHandlers from './gameLogic/getHandlers';
import {handleSlackErr} from './gameLogic/handlers/errorHandlers';
import {
  getRequestDefaults,
  applyToTriggers,
  postToReactionUri,
} from './helpers';

const injectDependencies = ({SLACK_TOKEN, data}) => {
  const parsedData = parse(data);
  const {post} = getRequestDefaults(SLACK_TOKEN);
  const addReaction = postToReactionUri({post, ...parsedData});
  return {
    trigger: applyToTriggers(parsedData),
    addReaction,
    parrotReaction: () => addReaction(parsedData.reaction).catch(handleSlackErr),
    handle: getHandlers({
      post,
      handleSlackErr,
      ...parsedData,
    }),
  };
};

export default injectDependencies;
