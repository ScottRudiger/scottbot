import sendFake from './sendFake';

export default () => sendFake({
  type: 'interactive_message',
  actions: [{value: 'hide_help'}],
  callback_id: 'hide_help',
  channel: {id: 'CCCQKV36C'},
  user: {id: 'UCCV2TS8Z', name: 'scottrudiger'},
  message_ts: '1543954948.003700',
  response_url: 'https://hooks.slack.com/actions/TCDCHS0LT/479823978561/9QO3UgqbAG8yxFtntS8nivnu',
});
