const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new Client(config);
app.use(middleware(config));

app.post('/api/webhook', async (req, res) => {
  const events = req.body.events;
  const results = await Promise.all(events.map(async (event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: `你說的是：「${event.message.text}」`
      });
    }
  }));
  res.json(results);
});

app.listen(3000, () => {
  console.log('LINE Bot is running');
});
