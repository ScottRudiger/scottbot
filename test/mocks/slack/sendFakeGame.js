import sendFake from './sendFake';

export const timestamp = '1543944841.003600';

export default botname => sendFake({
  event: {
    text: 'let\'s play!',
    username: botname,
    type: 'message',
    subtype: 'bot_message',
    ts: timestamp,
    channel: 'CCCQKV36C',
  },
  type: 'event_callback',
});
