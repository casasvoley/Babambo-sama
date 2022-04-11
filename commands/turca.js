// Comando que controla el contador de días sin mensaje de la turca

// Schema de la tabla turcacounter
const turcaModel = require('../models/turcaSchema');
// fs
const fs = require('fs');
// Fichero de variables de entorno
const env = JSON.parse(fs.readFileSync('src/env.json'));

module.exports = {
    name: 'turca',
    aliases: ['t','turcapesada'],
    description: "Maneja el contador de días sin mensajes de la turca.",
    async execute(message, args, cmd, client, Discord){
        // Tuple del servidor en la tabla turcacounter
        let turcaData;
        try{
            // Coge la tuple correspondiente al servidor
            turcaData = await turcaModel.findOne({serverID: message.guild.id});
            // si no existe la tuple, la creamos
            if (!turcaData){
                turcaData = await turcaModel.create({
                    serverID: message.guild.id,
                    turcaLastMessage: new Date(0)
                });
                turcaData.save();    
            }
        } catch (err){
            console.log(err);
        }

        // Comando '%turca reset'
        if (args.at(0).toLowerCase() === 'reset') {
            const date = new Date();

            // Actualiza el valor de turcaLastMessage en la tuple
            const response = await turcaModel.findOneAndUpdate(
                {
                    serverID: message.guild.id
                },
                {
                    $set: {
                        turcaLastMessage: date
                    }
                }
            );

            // Creamos el embed message
            const newEmbed = {
            color: '#3042B1',
            title: "Reinicio",
            description: "Reinicia el contador del número de días sin recibir mensajes de la turca.",
            fields: [
                {name: '¡Nuevo mensaje de la turca!', value: 'Más te vale contestarla, Alejandro.'},
                {name: 'Fecha', value: date.toString()}
            ],
            footer: {text: '/ᐠᵕ̩̩̥ ‸ᵕ̩̩̥ ᐟ\\ﾉɴʏᴀ~'},
            image: {url: "https://areajugones.sport.es/wp-content/uploads/2021/08/imagen-2021-08-07-180443-1080x609.jpg.webp"}
            } 

            // Enviamos el embed message
            message.channel.send({embeds: [newEmbed]});

        } 
        // Comando %turca days
        else if (args.at(0).toLowerCase() === 'counter'){
            const _MS_PER_DAY = 1000 * 60 * 60;

            // Si el contador ha sido reseteado antes
            if (turcaData.turcaLastMessage.toString() != new Date(0).toString()){
                diferencia = Math.floor((new Date() - Date.parse(turcaData.turcaLastMessage)) / _MS_PER_DAY);
                if (diferencia == 1) {
                    message.channel.send("Llevamos " + diferencia + " hora sin mensajes de la turca.");
                } else if (diferencia < 24){
                    message.channel.send("Llevamos " + diferencia + " horas sin mensajes de la turca.");
                } else{
                    const dias = Math.floor(diferencia/24);
                    const horas = Math.floor((diferencia%24)*24);
                    let str = "";
                    if (dias == 1){
                        str = str + `Llevamos ${dias} día`;
                    } else {
                        str = str + `Llevamos ${dias} días`;
                    }

                    if (horas == 1){
                        str = str + ` y ${horas} hora`;
                    } else if (horas > 1){
                        str = str + ` y ${horas} horas`;
                    }

                    message.channel.send(str + " sin mensajes de la turca.");
                }
            } 
            // Si no se ha reseteado
            else {
                message.channel.send("No se ha establecido la fecha del último mensaje de la turca.");
            }
        }
    }
}