import {Spinner} from 'clui';
import {exec} from 'child_process';
import {promisify} from 'util';

import {invalidToken} from './instructions';

const validateToken = ans => (
  /^xoxb-[\w-]+$/.test(ans.trim()) && !/xoxb-/.test(ans.trim().slice(5))
) || invalidToken;

const allAnsAreTruthy = (ans = {}) => Object.values(ans).every(Boolean);

const confirm = (name, message) => ({
  type: 'confirm',
  default: false,
  when: allAnsAreTruthy,
  name,
  message,
});

const startSpinner = verb => {
  const spinner = new Spinner(`Just a sec, ${verb} your webtask...`);
  spinner.start();
  return spinner;
};

const execAsync = promisify(exec);

const createWebtask = (file, token) => execAsync(
  `wt create ${file} --name scottbot --secret SLACK_TOKEN=${token.trim()}`,
);

const updateWebtask = file => execAsync(
  `wt update scottbot ${file} --ignore-package-json`,
);

export {
  validateToken,
  allAnsAreTruthy,
  confirm,
  startSpinner,
  execAsync,
  createWebtask,
  updateWebtask,
};
