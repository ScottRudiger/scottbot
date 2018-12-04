import sendFake from './sendFake';
import {timestamp} from './sendFakeGame';

const userId = 'UCCV2TS8Z';
const username = 'scottrudiger';

const getFakeClickData = ({clicked, userToClickAs = userId, nameToClickAs = username}) => ({
  type: 'interactive_message',
  actions: [{name: `${clicked}`, type: 'button', value: `${clicked}`}],
  callback_id: typeof clicked === 'number' || clicked === 'help'
    ? 'keypad'
    : clicked,
  channel: {id: 'CCCQKV36C', name: 'random'},
  user: {id: userToClickAs, name: nameToClickAs},
  message_ts: timestamp,
  response_url: 'https://hooks.slack.com/actions/TCDCHS0LT/434237779393/AUvDYLrLNeMEFQTdKsnTG60a',
});

const sendFakeClick = clicked => sendFake(getFakeClickData({clicked}));

const sendFakeClickAsUser = (clicked, {user, name}) => sendFake(
  getFakeClickData({clicked, userToClickAs: user, nameToClickAs: name}),
);

export default sendFakeClick;
export {
  username,
  sendFakeClickAsUser,
};
