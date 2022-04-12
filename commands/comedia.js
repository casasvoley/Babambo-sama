// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'comedia',
    aliases: ['com'],
    cooldown: 0,
    description: 'Momento comedia',
    async execute(message, args, cmd, client, Discord){
        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
        
        // Si no existe, creamos una
        if(!guildQueue) {
            guildQueue = client.player.createQueue(message.guild.id);
            await guildQueue.join(message.member.voice.channel);
        }

        let song = new dmp.Song({ name: "el tema de Don Comedias...", url: "https://youtu.be/gjF8080INGU"}, guildQueue, message.author.id);

        // Si la canción existe, la reproducimos
        if (song){
            await guildQueue.play(song);
            setTimeout(() => { guildQueue.skip(); }, 40000);
        }
    }
}

