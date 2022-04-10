module.exports = (Discord, client, message) => {
    const fs = require('fs');
    const env = JSON.parse(fs.readFileSync('src/env.json'));

    // Prefix of the bot commands
    const prefix = env.PREFIX;

    // If it does not start with the prefix or it is a message from the bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Remove the prefix and split by the spaces 
    const args = message.content.slice(prefix.length).split(/ +/);
    // Take elemnt 0 to lowercase
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
}