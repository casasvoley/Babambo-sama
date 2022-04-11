// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    cooldown: 0,
    description: 'Mezcla la cola de forma aleatoria',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, damos error
        if(!guildQueue) {
            return message.channel.send('El bot de música no está activo.');
        }

        // Mezclamos la cola
        guildQueue.shuffle();
    }
}