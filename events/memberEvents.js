module.exports = (client) => {
    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        if (!channel) return;

        const embed = {
            color: 0x00bfff,
            title: '🎉 Selamat Datang!',
            description: `Halo <@${member.id}>, selamat datang di **${member.guild.name}**!`,
            thumbnail: {
                url: member.user.displayAvatarURL({ dynamic: true })
            },
            footer: {
                text: `Member ke-${member.guild.memberCount}`
            },
            timestamp: new Date()
        };

        channel.send({ embeds: [embed] });
    });

    client.on('guildMemberRemove', member => {
        const channel = member.guild.channels.cache.get(process.env.GOODBYE_CHANNEL_ID);
        if (!channel) return;

        const embed = {
            color: 0xff5555,
            title: '😢 Selamat Tinggal...',
            description: `**${member.user.tag}** telah meninggalkan **${member.guild.name}**.`,
            thumbnail: {
                url: member.user.displayAvatarURL({ dynamic: true })
            },
            footer: {
                text: 'Semoga sukses selalu!'
            },
            timestamp: new Date()
        };

        channel.send({ embeds: [embed] });
    });
};
