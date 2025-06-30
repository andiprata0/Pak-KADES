// ai/handleAIChat.js
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function handleAIChat(message) {
  const userId = message.author.id;
  const filePath = `./history/${userId}.json`;
  let history = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    history = JSON.parse(data);
  }

  history.push({ role: 'user', content: message.content });

  try {
    await message.channel.sendTyping();

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: history.slice(-10)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://github.com/andiprata0',
          'X-Title': 'Kurokawa Akane',
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    history.push({ role: 'assistant', content: reply });
    fs.writeFileSync(filePath, JSON.stringify(history.slice(-20), null, 2));

    message.reply(reply);
  } catch (err) {
    console.error(err.response?.data || err.message);
    message.reply('❌ Gagal mendapatkan jawaban dari AI.');
  }
}

module.exports = handleAIChat;
