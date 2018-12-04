import * as instr from './instructions';
import {allAnsAreTruthy, validateToken, confirm} from './helpers';

const questions = [
  'wtCliInstalled',
  'slackAdmin',
  'createApp',
  'addBotUser',
  'installApp',
  {
    name: 'enterToken',
    type: 'password',
    mask: true,
    when: allAnsAreTruthy,
    message: instr.enterToken,
    validate: validateToken,
  },
  'enableEvents',
].map(q => q.name === 'enterToken' ? q : confirm(q, instr[q]));

const lastQuestion = confirm('saveChanges', instr.saveChanges);

export {questions, lastQuestion};
