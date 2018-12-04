import sendFake from './sendFake';

export default msg => sendFake({
  event: {
    type: 'message',
    user: 'UCCV2TS8Z',
    text: msg,
    ts: '1543929867.000200',
    channel: 'CCCQKV36C',
  },
});
