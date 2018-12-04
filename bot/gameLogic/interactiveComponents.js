const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['help'],
].map(nums => ({
  text: '',
  callback_id: 'keypad',
  actions: nums.map(num => ({
    name: num,
    text: num,
    type: 'button',
    value: num,
    style: num === 'help' ? 'danger' : null,
  })),
}));

export {
  keypad,
};
