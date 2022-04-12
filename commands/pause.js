// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'pause',
    aliases: ['ps'],
    cooldown: 0,
    description: 'Pausa la reproducción.',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, damos error
        if(!guildQueue) {
            return message.channel.send('El bot de música no está activo.');
        }

        // Si la reproducción ya está pausada, pasamos error
        if (guildQueue.paused){
            return message.channel.send('La reproducción ya está pausada.');
        // Si no, la pausamos
        } else {
            guildQueue.setPaused(true);
        }
    }
}