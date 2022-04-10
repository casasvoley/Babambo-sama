// Handler de comandos

// fs
const fs = require('fs');

module.exports = (client, Discord) => {
    // Directorio de ficheros de comandos
    const command_files = fs.readdirSync('commands/').filter(file => file.endsWith('.js'));

    // Por cada fichero de comando, añadirlo a la colección de comandos
    for (const file of command_files){
        const command = require(`../commands/${file}`);
        if (command.name){
            client.commands.set(command.name, command);
        } else{
            continue
        }
    }
}