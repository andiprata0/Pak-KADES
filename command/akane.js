const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'akane',
    description: 'Menampilkan profil Kurokawa Akane',
    execute(message) {
        const akane = {
            nama: "Kurokawa Akane",
            anime: "Oshi no Ko",
            umur: "17 tahun",
            tinggi: "156 cm",
            darah: "A",
            profesi: "Aktris",
            kepribadian: "Cerdas, perfeksionis, dan berdedikasi tinggi dalam akting.",
            trivia: "Terkenal karena akting realistis saat ikut reality show.",
            thumbnailPath: path.join(__dirname, '../data/akane.jpg')
        };

        const file = new AttachmentBuilder(akane.thumbnailPath);

        const embed = new EmbedBuilder()
            .setTitle("📘 Kurokawa Akane - Profil")
            .setColor(0x6C63FF)
            .setDescription("Profil karakter dari anime Oshi no Ko.")
            .addFields(
                { name: "Nama", value: akane.nama },
                { name: "Anime", value: akane.anime },
                { name: "Umur", value: akane.umur },
                { name: "Tinggi", value: akane.tinggi },
                { name: "Golongan Darah", value: akane.darah },
                { name: "Profesi", value: akane.profesi },
                { name: "Kepribadian", value: akane.kepribadian },
                { name: "Trivia", value: akane.trivia }
            )
            .setThumbnail('attachment://akane.jpg') // kecil di pojok
            .setFooter({ text: "Sumber: Oshi no Ko Wiki" });

        message.channel.send({ embeds: [embed], files: [file] });
    }
};
