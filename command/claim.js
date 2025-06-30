const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'claim',
    description: 'Claim role warga pakai tombol',
    async execute(message) {
        const embed = new EmbedBuilder()
            .setTitle('🧾 Claim Role')
            .setDescription('Klik tombol di bawah untuk claim role **Warga**.')
            .setColor(0x00bfff);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('claim_warga')
                .setLabel('Claim Role Warga')
                .setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
};