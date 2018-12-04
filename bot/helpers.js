import request from 'request-promise-native';

import * as triggers from './triggers';
import {handleSlackErr} from './gameLogic/handlers/errorHandlers';

const getRequestDefaults = token => ({
  get: request.defaults({
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  }).get,
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

const postToEphemeralUri = ({post, channel, userId}) => (text, attachments) => post({
  uri: 'chat.postEphemeral',
  body: {
    channel,
    text,
    attachments,
    user: userId,
    callback_id: 'guess-the-combo',
  },
}).catch(handleSlackErr);

const applyToTriggers = parsedData => Object.assign({}, Object.values(triggers).reduce(
  (invokedTriggers, trigger) => ({
    ...invokedTriggers,
    get [trigger.name]() { return trigger(parsedData); },
  }), {},
));

export {
  getRequestDefaults,
  postToReactionUri,
  postToEphemeralUri,
  applyToTriggers,
};
