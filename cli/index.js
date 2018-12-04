import {prompt} from 'inquirer';

import {questions, lastQuestion} from './questions';
import link, * as instr from './instructions';
import {
  createWebtask,
  updateWebtask,
  startSpinner,
  allAnsAreTruthy,
  execAsync,
} from './helpers';

/* eslint-disable no-console */
(async () => {
  // walk through setup of Webtask and Slack
  const ans = await prompt(questions);
  if (!ans.wtCliInstalled) return console.log(instr.installInstr);
  if (!ans.slackAdmin) return console.log(instr.slackAdminInstr);
  if (!allAnsAreTruthy(ans)) return console.log(instr.tryAgain);
  console.log(instr.verifyWithSlack);
  const spinner1 = startSpinner('creating');
  // create simple webtask for verifying w/ Slack
  const {stdout} = await createWebtask('./bot/verifyWithSlack.js', ans.enterToken)
    .catch(e => console.error('\n', e))
    .finally(() => spinner1.stop());
  const [wtUrl] = stdout.match(/\n(https:.+)\n/);
  console.log(
    `${link(wtUrl)}\n`,
    instr.inputWebtaskUrl,
  );
  const {saveChanges} = await prompt(lastQuestion);
  if (!saveChanges) return console.log(instr.tryVerifyingAgain);
  console.log(''); // just for spacing
  const spinner2 = startSpinner('updating');
  // bundle & update webtask w/ bot logic
  execAsync('npm run build')
    .then(() => updateWebtask('./bot/bundle.js'))
    .then(() => {
      spinner2.stop();
      console.log(instr.allDone);
    })
    .catch(e => console.error('\n', e));
})();
