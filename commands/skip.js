// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    cooldown: 0,
    description: 'Salta a la siguiente canción',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, damos error
        if(!guildQueue) {
            return message.channel.send('El bot de música no está activo.');
        }

        // Saltamos la canción
        guildQueue.skip();
    }
}