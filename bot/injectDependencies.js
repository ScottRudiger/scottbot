import parse from './parse';
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
  };
};

export default injectDependencies;
