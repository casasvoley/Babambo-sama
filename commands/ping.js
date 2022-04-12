// Comando de prube del bot

module.exports = {
    name: 'ping',
    aliases: ['pingpong'],
    description: "¿Jugamos al ping-pong?",
    execute(message, args, cmd, client, Discord){
        message.channel.send('pong!');
    }
}