// Comando que muestra la lista de comandos

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: "Lista de comandos.",
    execute(message, args, cmd, client, Discord){
        const newEmbed = {
        color: '#3042B1',
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