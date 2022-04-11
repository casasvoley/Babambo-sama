// Librería Discord Music Player
const dmp = require('discord-music-player');
const { MessageEmbed } = require('discord.js');

const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'queue',
    aliases: ['q'],
    cooldown: 0,
    description: 'Muestra la cola de reproducción',

    execute(message, args, cmd, client, Discord) {
        let numMostrar = 5;

        if (args[0]){
            numMostrar = args[0];
        }

        const guildQueue = client.player.getQueue(message.guild.id);

        if (!guildQueue) return message.channel.send(`No se está reproduciendo música,  ${message.author}...  ❌`);

        if (!guildQueue.songs[0]) return message.channel.send(`No hay música en la cola ${message.author}...  ❌`);

        const embed = new MessageEmbed();

        embed.setColor(env.EMBED_COLOR);
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: `Cola de reproducción`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});

        const songs = guildQueue.songs.map((song, i) => `**${i}** - ${song.name}`);
        songs.shift();
        const numSongs = guildQueue.songs.length-1;
        const nextSongs = numSongs > numMostrar ? `Y otra(s) **${numSongs - numMostrar}** canción(es)...` : `En la cola hay **${numSongs}** canción(es) más...`;

        embed.setDescription(`Está sonando ${guildQueue.nowPlaying.name}\n\n${songs.slice(0, numMostrar).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};