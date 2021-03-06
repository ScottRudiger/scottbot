import qs from 'querystring';

/**
 * - parses Slack API data
 * - filters out relevant nested properties
 * - returns an easy-to-pick-from object
 *
 * @param {String} data the raw request data sent from Slack API
 * @returns {Object}
 *//* eslint-disable no-var, vars-on-top, no-redeclare */
export default data => {
  if (data.slice(0, 8) === 'payload=') data = qs.parse(data).payload;
  data = JSON.parse(data);
  const {type} = data.event ? data.event : data;
  if (type !== 'interactive_message') var {
    text,
    channel,
    ts: timestamp,
    subtype,
    user: userId,
    username,
    reaction,
  } = data.event;
  else var {
    callback_id: callbackId,
    channel: {id: channel},
    user: {id: userId, name: username},
    actions: [{value: clicked}],
    message_ts: timestamp,
    response_url: responseUrl,
  } = data;
  if (type === 'reaction_added') var {channel, ts: timestamp} = data.event.item;
  return {
    type,
    text,
    channel,
    timestamp,
    subtype,
    userId,
    callbackId,
    username,
    clicked,
    responseUrl,
    reaction,
  };
};
