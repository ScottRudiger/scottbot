import {keypad} from '../interactiveComponents';

const handlePlayGame = ({post, channel, handleSlackErr}) => () => post({
  uri: 'chat.postMessage',
  body: {
    channel,
    text: 'let\'s play!',
    callback_id: 'guess-the-combo',
    attachments: keypad,
  },
}).catch(handleSlackErr);

export default handlePlayGame;
