import { RTMClient, WebClient } from '@slack/client';

const SLACK_TOKEN = process.env.SLACK_TOKEN;

if (!SLACK_TOKEN) {
  throw new Error('SLACK_TOKEN not set in .env file');
}

// Initialize clients
const rtm = new RTMClient(SLACK_TOKEN);
const web = new WebClient(SLACK_TOKEN);

// Initialize basic events
rtm.on('connected', () => {
  console.log('[Slackbot] Connected to Slack!');
  web.channels.list().then(({ channels, ...data }) => {
    console.log('[Slackbot] Slack channels:', channels.map((channel) => channel.name).join(', '));
  });
});

// Export the RTM and WEB clients
export { rtm, web };