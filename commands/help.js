// Comando que muestra la lista de comandos

const {MessageEmbed} = require('discord.js'); // Librería de Discord
const fs = require('fs'); // fs
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: "Lista de comandos.",
    execute(message, args, cmd, client, Discord){
        // Creamos el embed message
        const embed = new MessageEmbed();

        // Color, miniatura y autor
        embed.setColor(env.EMBED_COLOR);
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })});
        embed.setTimestamp();
        
        //Título y contenido
        embed.setTitle("Lista de comandos");
        embed.addFields( [
            {name: '%ping (%pingpong)', value: '¿Una partidita de ping-pong?'},
            {name: '%turca reset (%t reset, %turcapeasda reset)', value: 'Reinicia el contador de días sin mensaje de la turca.'},
            {name: '%turca days (%t days, %turcapeasda days)', value: 'Muestra el contador de días sin mensaje de la turca.'}
        ]);

        message.channel.send({embeds: [embed]});
    }
}