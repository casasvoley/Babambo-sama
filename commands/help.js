// Comando que muestra la lista de comandos

const fs = require('fs'); // fs
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: "Lista de comandos.",
    execute(message, args, cmd, client, Discord){
        const newEmbed = {
        color: env.EMBED_COLOR,
        title: "Lista de comandos",
        description: "Lista de comandos.",
        fields: [
            {name: '%ping (%pingpong)', value: '¿Una partidita de ping-pong?'},
            {name: '%turca reset (%t reset, %turcapeasda reset)', value: 'Reinicia el contador de días sin mensaje de la turca.'},
            {name: '%turca days (%t days, %turcapeasda days)', value: 'Muestra el contador de días sin mensaje de la turca.'}
        ]}
        message.channel.send({embeds: [newEmbed]});
    }
}