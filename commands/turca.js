module.exports = {
    name: 'turca',
    description: "Maneja el contador de días sin mensajes de la turca.",
    execute(message, args){
        const fs = require('fs');
        if (args.at(0) === 'reset') {
            const variables = JSON.parse(fs.readFileSync(message.guild.id.toString() + ".json"));
            variables.turcaLastMessage = new Date();
            fs.writeFileSync(message.guild.id.toString() + ".json", JSON.stringify(variables));

            const newEmbed = {
            color: '#3042B1',
            title: "Reinicio",
            description: "Reinicia el contador del número de días sin recibir mensajes de la turca.",
            fields: [
                {name: '¡Nuevo mensaje de la turca!', value: 'Más te vale contestarla, Alejandro.'},
                {name: 'Fecha', value: variables.turcaLastMessage.toString()}
            ],
            footer: {text: '/ᐠᵕ̩̩̥ ‸ᵕ̩̩̥ ᐟ\\ﾉɴʏᴀ~'},
            image: {url: "https://areajugones.sport.es/wp-content/uploads/2021/08/imagen-2021-08-07-180443-1080x609.jpg.webp"}
            } 

            message.channel.send({embeds: [newEmbed]});
        } else if (args.at(0) === 'days'){
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            const variables = JSON.parse(fs.readFileSync('variables.json'));
            if (variables.turcaLastMessage !== ""){
                diferencia = Math.floor((new Date() - Date.parse(variables.turcaLastMessage)) / _MS_PER_DAY);
                message.channel.send("Llevamos " + diferencia + " días sin mensajes de la turca.");
            } else {
                message.channel.send("No se ha establecido la fecha del último mensaje de la turca.");
            }
        }
    }
}