// Librería de acceso a enlaces de YouTube
const ytdl = require('ytdl-core');
// Librería de búsqueda en Youtube
const ytSearch = require('yt-search');
// Librería de voz de Discord
const {joinVoiceChannel, createAudioPlayer} = require('@discordjs/voice');
// Librería Discord Music Player
const dmp = require('discord-music-player');

// Cola global para todos los servidores
// queue(message.guild.id, queue_constructor object { voice_channel, text_channel, connection, songs[] });
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    cooldown: 0,
    description: 'Funcionalidad de mbot de música',
    async execute(message, args, cmd, client, Discord){

        let guildQueue = client.player.getQueue(message.guild.id);
       
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
        if (song){
            await guildQueue.play(args.join(' '));
        }

        /* // Comprobamos si el usuario está en un chat de voz
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('¡Métete en un chat de voz primero!');

        // Comprobamos si el usuario tiene los permisos necesarios
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No tienes los permisos necesarios.');
        if(!permissions.has('SPEAK')) return message.channel.send('No tienes los permisos necesarios.');

        // Cogemos la cola del servidor de la cola global
        const server_queue = queue.get(message.guild.id);

        // Si el comando era %play
        if (cmd === 'play'){
            // Si el ususario no ha especificado la canción, damos error
            if (!args.length) return message.channel.send('No me has dicho qué temardo tengo que poner.');

            // Información de la canción que quiere el usuario
            let song = {};

            // Si es una URL, lo ponemos como información de la canción
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url};
            // Si no, buscamos en Youtube y lo ponemos como información de la canción
            } else {
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url};
                } else {
                    message.channel.send('No pude encontrar el vídeo ;_;');
                }
            }

            // Si no existe la cola del servidor, creamos una
            if (!server_queue) {
                // Creamos una coal del servidor
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor);

                // Y añadimos la canción a la cola
                queue_constructor.songs.push(song);
                
                // Nos conectamos al chat de voz y reprducimos la primera canción
                try{
                    const connection = await joinVoiceChannel({
                        channelId: voice_channel.id,
                        guildId: voice_channel.guild.id,
                        adapterCreator: voice_channel.guild.voiceAdapterCreator
                    });
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err){
                    queue.delete(message.guild.id);
                    message.channel.send('Ha habido un problema de conexión ;_;');
                    throw err;
                }
            // Si existe la cola del servidor, añadimos la canción a la cola
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`¡${song.title} añadida a la cola!`);
            }
        } */
    }
}

// Función que se encarga de reproducir las canciones
const video_player = async (guild, song) =>{
    const song_queue = queue.get(guild.id);

    if (!song){
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return
    }

    const stream = ytdl(song.url, {filter: 'audioonly'});
    song_queue.connection.play(stream, {seek: 0, volume: 0.5})
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`Está sonando ${song.title}`);
}