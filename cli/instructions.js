import {
  cyan,
  red,
  grey,
  green,
} from 'chalk';

const link = url => cyan.underline(url);

export const wtCliInstalled = `Have you installed & initialized Webtask CLI following the directions at (${link`https://webtask.io/cli`})?\n`;

export const installInstr = `\nPlease follow the directions at (${
  link`https://webtask.io/cli`
}) then run \`${red`$ ` + grey`npm start`}\` again.\n`;

export const slackAdmin = 'Do you have admin access to a Slack channel?\n';

export const slackAdminInstr = `\nYou will need admin access to a Slack channel to add the bot. You can create a new Slack channel at (${link`https://slack.com/create`}) if needed.\n`;

export const createApp = `Great! Next go to (${link`https://api.slack.com/apps`}) and click ${green.bold`Create New App`}. Name the app whatever you want, but it's best to keep it as one word. Then, select the workspace where you'd like to add the bot and click ${green.bold`Create App`}. Confirm when you're ready to move on.\n`;

export const tryAgain = `\nNo worries, just run \`${red`$ ` + grey`npm start`}\` again whenever you're ready.\n`;

export const addBotUser = `Slack should now be showing your new app's ${grey`Basic Information`}. On the left-hand side click ${grey`Bot Users`} then click ${grey`Add a Bot User`}. Please keep the ${grey`Display name`} and ${grey`Default username`} as their defaults; then click ${green.bold`Add Bot User`}. Confirm when ready.\n`;

export const installApp = `Next, go to ${grey`OAuth & Permissions`} on the left-hand side menu and click ${green.bold`Install App to Workspace`}, then click ${green.bold`Authorize`}. Confirm to move on.\n`;

export const enterToken = `Copy the ${grey`Bot User OAuth Access Token`} provided by Slack and paste it here (it should start with '${cyan`xoxb-`}'). Then press enter.\n`;

export const invalidToken = `Check that you've copied the right ${grey`Bot User OAuth Access Token`}. It should start with '${cyan`xoxb-`}'.`;

export const enableEvents = `Nice. 😎  Next, go to ${grey`Event Subscriptions`} on the left-hand side menu and turn ${grey`Enable Events` + green.bold` On`}. Then, scroll down to ${grey`Subscribe to Bot Events`} and add the following ${grey`Bot User Events`}: ${green`\n  app_mention\n  file_comment_added\n  file_created\n  message.channels\n  reaction_added\n`}Confirm when you're ready to move on.\n`;

export const verifyWithSlack = 'Thanks; next we\'ll verify your webtask with Slack.\n';

export const inputWebtaskUrl = `Copy the above Webtask URL, then scroll up on the Slack ${grey`Event Subscriptions`} page and paste it into the ${grey`Request URL`} field. Once verified, click ${green.bold`Save Changes`}.\n\nThen, go to ${grey`Interactive Components`} on the left-hand side menu and click to turn ${grey`Interactivity` + green.bold` On`}. Paste the same Webtask URL into the ${grey`Request URL`} field and click ${green.bold`Save Changes`} again.\n`;

export const saveChanges = 'Almost done! Confirm once you\'ve saved the Webtask URL in both places.';

export const tryVerifyingAgain = `\nIf Slack didn't verify correctly, something might've gone wrong with Webtask. Please try running \`${red`$` + grey`npm start`}\` again.\n`;

const partyBanner = green`🎉 🎉 🎉  -------------------------------------------------------------------------------------- 🎉 🎉 🎉`;

export const allDone = `${partyBanner}\n\nYou're all set! Go to Slack and invite the bot to a channel by mentioning it: \`${grey`@<botname>`}\`.\n\nThen, click ${cyan`Invite Them`}. You can try out the game by typing \`${grey`@<botname> play guess-the-combo`}\`. 🤖 👍\n\n${partyBanner}\n`;

export default link;
