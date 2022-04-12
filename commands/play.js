// Librería de acceso a enlaces de YouTube
const ytdl = require('ytdl-core');
// Librería de búsqueda en Youtube
const ytSearch = require('yt-search');
// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 0,
    description: 'Añade canciones a la cola del bot de música',
    async execute(message, args, cmd, client, Discord){

        // If para ignorar a Alejandro
        if (message.author.username == "casasvoley"){
            message.channel.send(message.author.id);
            // Buscamos la cola del servidor
            let guildQueue = client.player.getQueue(message.guild.id);
        
            // Si no existe, creamos una
            if(!guildQueue) {
                guildQueue = client.player.createQueue(message.guild.id);
                await guildQueue.join(message.member.voice.channel);
            }

            let song;
            // Si es una URL, lo ponemos como información de la canción
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

            // Si la canción existe, la reproducimos
            if (song){
                await guildQueue.play(song);
            }
        } else{
            // Creamos el embed message
            const embed = new MessageEmbed();
            embed.setColor(env.EMBED_COLOR);
            embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
            embed.setTimestamp();

            embed.setTitle( "Reinicio");
            embed.addFields( [
                {name: '¡Nuevo mensaje de la turca!', value: 'Más te vale contestarla, Alejandro.'},
                {name: 'Fecha', value: date.toLocaleString('es-ES', {timeZone: 'Europe/Madrid'})}
            ]);
            embed.setImage( "https://areajugones.sport.es/wp-content/uploads/2021/08/imagen-2021-08-07-180443-1080x609.jpg.webp"); 
            embed.setFooter({text: '/ᐠᵕ̩̩̥ ‸ᵕ̩̩̥ ᐟ\\ﾉɴʏᴀ~'});

            // Enviamos el embed message
            message.channel.send({embeds: [embed]});
        }
    }
}