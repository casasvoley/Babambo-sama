// Comando que muestra la lista de comandos

module.exports = {
    name: 'help',
    description: "Lista de comandos.",
    execute(client, message, args, Discord){
        const newEmbed = {
        color: '#3042B1',
        title: "Lista de comandos",
        description: "Lista de comandos.",
        fields: [
            {name: '%turca reset', value: 'Reinicia el contador de días sin mensaje de la turca.'},
            {name: '%turca days', value: 'Muestra el contador de días sin mensaje de la turca.'}
        ]}
        message.channel.send({embeds: [newEmbed]});
    }
}