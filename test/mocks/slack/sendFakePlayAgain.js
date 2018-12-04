import sendFake from './sendFake';

export default () => sendFake({
  type: 'interactive_message',
  actions: [{value: 'play_again'}],
  callback_id: 'play_again',
  channel: {id: 'CCCQKV36C'},
  user: {id: 'UCCV2TS8Z', name: 'scottrudiger'},
  message_ts: '1543956740.004300',
  response_url: 'https://hooks.slack.com/actions/TCDCHS0LT/480505157058/Ewtp6NcZPdVSRijTLSM5L8Xp',
});
