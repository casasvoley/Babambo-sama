// Librería Discord Music Player
const dmp = require('discord-music-player');

module.exports = {
    name: 'stop',
    aliases: ['st'],
    cooldown: 0,
    description: 'Para la canción y limpia la cola.',
    async execute(message, args, cmd, client, Discord){

        // Buscamos la cola del servidor
        let guildQueue = client.player.getQueue(message.guild.id);
       
        // Si no existe, damos error
        if(!guildQueue) {
            return message.channel.send('El bot de música no está activo.');
        }

        // Paramos la cacnión y borramos la cola
        guildQueue.stop();
    }
}