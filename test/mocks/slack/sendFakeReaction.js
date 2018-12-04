import sendFake from './sendFake';

export default reaction => sendFake({
  event: {
    type: 'reaction_added',
    user: 'UCCV2TS8Z',
    item: {
      channel: 'CCCQKV36C',
      ts: '1543929867.000200',
    },
    reaction,
  },
});
