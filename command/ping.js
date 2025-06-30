module.exports = {
    name: 'ping',
    description: 'Menampilkan latency pesan dan WebSocket bot',
    async execute(message) {
        const sent = await message.channel.send('🔄 Menghitung ping...');
        const messageLatency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = message.client.ws.ping;

        sent.edit(`🏓 **Pong!**
📶 Latensi Pesan: \`${messageLatency}ms\`
🌐 WebSocket Ping: \`${apiLatency}ms\``);
    }
};
