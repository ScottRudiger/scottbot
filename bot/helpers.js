import request from 'request-promise-native';

import * as triggers from './triggers';

const getRequestDefaults = token => ({
  post: request.defaults({
    baseUrl: 'https://slack.com/api/',
    headers: {Authorization: `Bearer ${token}`},
    json: true,
  }).post,
});

const postToReactionUri = ({
  post,
  channel,
  timestamp,
}) => emoji => post({
  uri: 'reactions.add',
  body: {
    name: emoji,
    channel,
    timestamp,
  },
});

const applyToTriggers = parsedData => Object.assign({}, Object.values(triggers).reduce(
  (invokedTriggers, trigger) => ({
    ...invokedTriggers,
    get [trigger.name]() { return trigger(parsedData); },
  }), {},
));

export {
  getRequestDefaults,
  postToReactionUri,
  applyToTriggers,
};
