// Librería Discord Music Player
const dmp = require('discord-music-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    cooldown: 0,
    description: 'Muestra la cola de reproducción',

    execute(message, args, cmd, client, Discord) {
        const guildQueue = client.player.getQueue(message.guild.id);

        if (!guildQueue) return message.channel.send(`No se está reproduciendo música,  ${message.author}...  ❌`);

        if (!guildQueue.songs[0]) return message.channel.send(`No hay música en la cola ${message.author}...  ❌`);

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: `Cola de reproducción`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        const songs = guildQueue.songs.map((song, i) => `**${i + 1}** - ${song.name} | ${song.author}`);
        songs.shift();
        const numSongs = guildQueue.songs.length;
        const nextSongs = numSongs > 5 ? `Y otra(s) **${numSongs - 5}** canción(es)...` : `En la cola hay **${numSongs}** canción(es)...`;

        embed.setDescription(`Está sonando ${guildQueue.nowPlaying.name}\n\n${songs.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};