module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'claim_warga') {
            const roleName = 'warga';
            const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === roleName);

            if (!role) {
                return interaction.reply({
                    content: `❌ Role **${roleName}** tidak ditemukan.`,
                    ephemeral: true
                });
            }

            if (interaction.member.roles.cache.has(role.id)) {
                return interaction.reply({
                    content: `✅ Kamu sudah memiliki role **${roleName}**.`,
                    ephemeral: true
                });
            }

            try {
                await interaction.member.roles.add(role);
                interaction.reply({
                    content: `🎉 Role **${roleName}** berhasil ditambahkan ke akunmu!`,
                    ephemeral: true
                });
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: '❌ Gagal menambahkan role. Cek izin atau urutan role bot.',
                    ephemeral: true
                });
            }
        }
    });
};
