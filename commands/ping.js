// Comando de prube del bot

module.exports = {
    name: 'ping',
    aliases: ['pingpong'],
    description: "This is a ping command",
    execute(message, args, cmd, client, Discord){
        message.channel.send('pong!');
    }
}