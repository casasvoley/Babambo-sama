// MessageEmbed y MessageAttachment
const {MessageEmbed, MessageAttachment} = require('discord.js');
// Librería de acceso a enlaces de YouTube
const ytdl = require('ytdl-core');
// Librería de búsqueda en Youtube
const ytSearch = require('yt-search');
// Librería Discord Music Player
const dmp = require('discord-music-player');

const fs = require('fs'); // fs
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 0,
    description: 'Añade canciones a la cola del bot de música.',
    async execute(message, args, cmd, client, Discord){

        // If para ignorar a Alejandro
        if (message.author.username == "Malexba" && Math.random() > 0.95){
            // Creamos el embed message
            const file = new MessageAttachment('resources/anime-tsundere.gif');
            const exampleEmbed = new MessageEmbed()
	            .setColor(env.EMBED_COLOR)
	            .setImage('attachment://anime-tsundere.gif');

            message.channel.send({ embeds: [exampleEmbed], files: [file] });
        } else {

            // Buscamos la cola del servidor
            let guildQueue = client.player.getQueue(message.guild.id);
        
            // Si no existe, creamos una
            if(!guildQueue) {
                guildQueue = client.player.createQueue(message.guild.id);
                if(!args[0]){
                    return message.channel.send(`${message.author}, no me has dicho ninguna canción ;_;`);
                } else {
                    await guildQueue.join(message.member.voice.channel);
                }
            }

            let song;
            // Si es una URL, lo ponemos como información de la canción
            try {
                if(!args[0]){
                    return message.channel.send(`${message.author}, no me has dicho ninguna canción ;_;`);
                } else if (ytdl.validateURL(args[0])) {
                    const song_info = await ytdl.getInfo(args[0]);
                    song = new dmp.Song({ name: song_info.videoDetails.title, url: song_info.videoDetails.video_url}, guildQueue, message.author.id);
                // Si no, buscamos en Youtube y lo ponemos como información de la canción
                } else {
                    const video_finder = async (query) => {
                        const videoResult = await ytSearch(query);
                        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                    }
    
                    const video = await video_finder(args.join(' '));
                    if (video) {
                        song = new dmp.Song({ name: video.title, url: video.url}, guildQueue, message.author.id);
                    } else {
                        message.channel.send(`${message.author}, no pude encontrar el vídeo ;_;`);
                    }
                }
            } catch {
                message.channel.send(`${message.author}, parece que el enlace está caído o tiene algún problema ;_;`);
                client.player.getQueue(message.guild.id).stop();
            }
            

            // Si la canción existe, la reproducimos
            if (song){
                await guildQueue.play(song);
                // Creamos el embed message
                const embed = new MessageEmbed();

                // Color
                embed.setColor(env.EMBED_COLOR);
                embed.setTimestamp();

                // Creamos la descripción
                embed.setDescription(`${song.name} fue añadida a la cola.`);

                message.channel.send({ embeds: [embed] });
            }
        } 
    }
}