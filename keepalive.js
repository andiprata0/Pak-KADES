// keepalive.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is Alive! 🌐');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🌍 Ping server aktif di port ${PORT}`);
});
