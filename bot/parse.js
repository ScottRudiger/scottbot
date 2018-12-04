/**
 * - parses Slack API data
 * - filters out relevant nested properties
 * - returns an easy-to-pick-from object
 *
 * @param {String} data the raw request data sent from Slack API
 * @returns {Object}
 *//* eslint-disable no-var, vars-on-top, no-redeclare */
export default data => {
  data = JSON.parse(data);
  const {type} = data.event ? data.event : data;
  if (type !== 'interactive_message') var {
    text,
    channel,
    ts: timestamp,
  } = data.event;
  return {
    type,
    text,
    channel,
    timestamp,
  };
};
