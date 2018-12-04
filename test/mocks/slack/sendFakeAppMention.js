import sendFake from './sendFake';

export default msg => sendFake({
  event: {
    type: 'app_mention',
    user: 'UCCV2TS8Z',
    text: `<@UCGN5JCRL> ${msg}`,
    ts: '1543940448.002100',
    channel: 'CCCQKV36C',
  },
});
