// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'resume',
    aliases: ['rs'],
    cooldown: 0,
    description: 'Reanuda la reproducción',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, damos error
        if(!guildQueue) {
            return message.channel.send('El bot de música no está activo.');
        }

        // Si la reproducción ya está pausada, la reanudamos
        if (guildQueue.paused){
            guildQueue.setPaused(false);
        // Si no, damos error
        } else {
            return message.channel.send('La reproducción no está pausada.');
        }
    }
}