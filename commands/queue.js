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

        if (!guildQueue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        if (!guildQueue.songs[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: `Server queue - ${message.guild.name}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        const songs = guildQueue.songs.map((song, i) => `**${i + 1}** - ${song.name} | ${song.author}`);

        const numSongs = guildQueue.songs.length;
        const nextSongs = numSongs > 5 ? `And **${numSongs - 5}** other song(s)...` : `In the playlist **${numSongs}** song(s)...`;

        embed.setDescription(`Current ${guildQueue.nowPlaying.name}\n\n${songs.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        message.channel.send({ embeds: [embed] });
    },
};