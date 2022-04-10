// Handler de eventos

// fs
const fs = require('fs');

module.exports = (client, Discord) => {
    // Función que lee los directorios de ficheros de eventos
    const load_dir = (dir) => {
        // Directorio de ficheros de eventos
        const event_files = fs.readdirSync(`events/${dir}`).filter(file => file.endsWith('.js'));
    
        // Por cada fichero de comando, añadirlo a la colección de eventos
        for (const file of event_files){
            const event = require(`../events/${dir}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    
    // Ejectuamos la función anterior para ambos directorios de ficheros de eventos
    ['client','guild'].forEach(e => load_dir(e));
}