// index.js
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

// Aktifkan web server ping agar tetap online
require('./keepalive');

// AI Handler
const handleAIChat = require('./ai/handleAIChat');

// Inisialisasi bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

// Load semua command dari folder 'command'
const commandFiles = fs.readdirSync(path.join(__dirname, 'command')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./command/${file}`);
    client.commands.set(command.name, command);
}

// Load event handler
require('./events/memberEvents')(client);
require('./events/interactionCreate')(client);

// Bot siap digunakan
client.once('ready', () => {
    console.log(`✅ Bot ${client.user.tag} sudah online!`);

    // Rotasi status bot
    const statusList = [
        () => `Kurokawa Akane💙`,
        () => `I Love Andika💙`,
        () => `AI Aktif 24 Jam`,
        () => `Selalu Taat Peraturan yah!😉`,
        () => `Made By @andiprata_`,
    ];

    let i = 0;
    setInterval(() => {
        const status = statusList[i % statusList.length]();
        client.user.setPresence({
            activities: [{ name: status, type: 0 }],
            status: 'online'
        });
        i++;
    }, 5000);
});

// Handle command dan AI
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.channel.id === process.env.AI_CHANNEL_ID) {
        return handleAIChat(message);
    }

    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('❌ Terjadi kesalahan saat menjalankan perintah.');
    }
});

// Login bot ke Discord
client.login(process.env.DISCORD_TOKEN);
