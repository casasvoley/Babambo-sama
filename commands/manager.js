// Schema de la tabla managercounter
const managerModel = require('../models/managerSchema');
// fs
const fs = require('fs');
// Fichero de variables de entorno
const env = JSON.parse(fs.readFileSync('src/env.json'));

module.exports = {
    name: 'manager',
    aliases: ['fm'],
    description: "Maneja el contador de horas sin jugar a Football Manager.",
    async execute(message, args, cmd, client, Discord){
        // Tuple del servidor en la tabla managercounter
        let managerData;
        try{
            // Coge la tuple correspondiente al servidor
            managerData = await managerModel.findOne({serverID: message.guild.id});
            // si no existe la tuple, la creamos
            if (!managerData){
                managerData = await managerModel.create({
                    serverID: message.guild.id,
                    lastPlay: new Date(0)
                });
                managerData.save();    
            }
        } catch (err){
            console.log(err);
        }

        // Comando '%manager reset'
        if (args.at(0).toLowerCase() === 'reset') {
            const date = new Date();

            // Actualiza el valor de lastPlay en la tuple
            const response = await managerModel.findOneAndUpdate(
                {
                    serverID: message.guild.id
                },
                {
                    $set: {
                        lastPlay: date
                    }
                }
            );

            // Creamos el embed message
            const newEmbed = {
            color: env.EMBED_COLOR,
            title: "Reinicio",
            description: "Reinicia el contador del número de horas sin jugar al Football Manager.",
            fields: [
                {name: 'Fecha', value: date.toString()}
            ],
            image: {url: "https://imagenes.elpais.com/resizer/1Hfn_8CK7o6cOzHpaT8kNUDHi2g=/1960x0/filters:focal(1745x609:1755x619)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7G364PMCSFGIHFZNHHJLNQL4SU.jpg"}
            } 

            // Enviamos el embed message
            message.channel.send({embeds: [newEmbed]});

        } 
        // Comando %manager days
        else if (args.at(0).toLowerCase() === 'counter'){
            const _MS_PER_DAY = 1000 * 60 * 60;

            // Si el contador ha sido reseteado antes
            if (managerData.lastPlay.toString() != new Date(0).toString()){
                diferencia = Math.floor((new Date() - Date.parse(managerData.lastPlay)) / _MS_PER_DAY);
                if (diferencia == 1) {
                    message.channel.send("Alejandro lleva " + diferencia + " hora sin jugar al Football Manager.");
                } else if (diferencia < 24){
                    message.channel.send("Alejandro lleva " + diferencia + " horas sin jugar al Football Manager.");
                } else{
                    const dias = Math.floor(diferencia/24);
                    const horas = Math.floor(diferencia - (dias*24));
                    let str = "";
                    if (dias == 1){
                        str = str + `Alejandro lleva ${dias} día`;
                    } else {
                        str = str + `Alejandro lleva ${dias} días`;
                    }

                    if (horas == 1){
                        str = str + ` y ${horas} hora`;
                    } else if (horas > 1){
                        str = str + ` y ${horas} horas`;
                    }

                    message.channel.send(str + " sin jugar al Football Manager.");
                }
            } 
            // Si no se ha reseteado
            else {
                message.channel.send("No se ha establecido la fecha de la última partida.");
            }
        }
    }
}