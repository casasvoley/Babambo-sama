// Librería de acceso a enlaces de YouTube
const ytdl = require('ytdl-core');
// Librería de búsqueda en Youtube
const ytSearch = require('yt-search');
// Librería Discord Music Player
const dmp = require('discord-music-player');

// Cola global para todos los servidores
// queue(message.guild.id, queue_constructor object { voice_channel, text_channel, connection, songs[] });
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 0,
    description: 'Funcionalidad de mbot de música',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, creamos una
        if(!guildQueue) {
            guildQueue = client.player.createQueue(message.guild.id);
            await guildQueue.join(message.member.voice.channel);
        }

        let song;
        // Si es una URL, lo ponemos como información de la canción
        if (ytdl.validateURL(args[0])) {
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
                message.channel.send('No pude encontrar el vídeo ;_;');
            }
        }

        // Si la canción existe, la reproducimos
        if (song){
            await guildQueue.play(song);
        }
    }
}