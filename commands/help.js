

module.exports = {
    name: 'help',
    description: "Lista de comandos.",
    execute(message, args, MessageEmbed){
        const newEmbed = {
        color: '#3042B1',
        title: "Lista de comandos",
        description: "Lista de comandos.",
        fields: [
            {name: 'turca reset', value: 'Reinicia el contador de días sin mensaje de la turca.'},
            {name: 'turca days', value: 'Muestra el contador de días sin mensaje de la turca.'}
        ]}
        message.channel.send({embeds: [newEmbed]});
    }
}