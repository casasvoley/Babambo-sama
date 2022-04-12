// Librería Discord Music Player
const { MessageEmbed } = require('discord.js');

const fs = require('fs'); // fs
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'queue',
    aliases: ['q'],
    cooldown: 0,
    description: 'Muestra la cola de reproducción',

    execute(message, args, cmd, client, Discord) {
        let numMostrar = 5; // Número de canciones a mostrar

        if (args[0]){
            numMostrar = args[0];
        }

        const guildQueue = client.player.getQueue(message.guild.id); // Cola del servidor

        // Si no hay cola, damos error
        if (!guildQueue) return message.channel.send(`No se está reproduciendo música,  ${message.author}...  ❌`);

        // Si la cola está vacía, damos error
        // (Nunca está vacía, simepre tiene al menos la canción en reproducción)
        if (!guildQueue.songs[0]) return message.channel.send(`No hay música en la cola ${message.author}...  ❌`);

        // Creamos el embed message
        const embed = new MessageEmbed();

        // Color, miniatura y autor
        embed.setColor(env.EMBED_COLOR);
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({name: `Cola de reproducción`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});
        embed.setTimestamp();

        // Creamos un array con los nombres de las canciones
        const songs = guildQueue.songs.map((song, i) => `**${i}** - ${song.name}`);
        // Quitamos la canción que está sonando
        songs.shift();
        // Calculamos la longitud de la cola
        const numSongs = guildQueue.songs.length-1;
        const nextSongs = numSongs > numMostrar ? `Y otra(s) **${numSongs - numMostrar}** canción(es) más...` : `En la cola hay **${numSongs}** canción(es)...`;

        // Con estos datos, creamos la descripción
        embed.setDescription(`Está sonando ${guildQueue.nowPlaying.name}\n\n${songs.slice(0, numMostrar).join('\n')}\n\n${nextSongs}`);

        

        message.channel.send({ embeds: [embed] });
    },
};