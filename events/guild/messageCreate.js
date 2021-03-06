// Evento de que se ha creado un nuevo mensaje

module.exports = (Discord, client, message) => {
    // fs
    const fs = require('fs');
    // Fichero con las variables de entorno
    const env = JSON.parse(fs.readFileSync('src/env.json'));

    // Prefix of the bot commands
    const prefix = env.PREFIX;

    // If it does not start with the prefix or it is a message from the bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Remove the prefix and split by the spaces 
    const args = message.content.slice(prefix.length).split(/ +/);
    // Take first word of the command to lowercase
    const cmd = args.shift().toLowerCase();
    // Take command from the collection of commands, searching also by its aliases
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // Execute command
    try{
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply("Ha habido un error al ejecutar el comando.");
        console.log(err);
    }
}