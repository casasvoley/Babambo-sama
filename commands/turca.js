module.exports = {
    name: 'turca',
    description: "Maneja el contador de días sin mensajes de la turca.",
    execute(message, args){
        const turcaModel = require('../models/turcaSchema');
        let turcaData;
        try{
            turcaData = turcaModel.findOne({serverID: message.guild.id});
            if(!turcaData){
                    turcaData = turcaModel.create({
                    serverID: message.guild.id,
                    turcaLastMessage: ""
                });
                turcaData.save();
            }
        } catch(err){}

        if (args.at(0) === 'reset') {
            
            turcaData.turcaLastMessage = new Date();
            turcaData.save();

            const newEmbed = {
            color: '#3042B1',
            title: "Reinicio",
            description: "Reinicia el contador del número de días sin recibir mensajes de la turca.",
            fields: [
                {name: '¡Nuevo mensaje de la turca!', value: 'Más te vale contestarla, Alejandro.'},
                {name: 'Fecha', value: turcaData.turcaLastMessage.toString()}
            ],
            footer: {text: '/ᐠᵕ̩̩̥ ‸ᵕ̩̩̥ ᐟ\\ﾉɴʏᴀ~'},
            image: {url: "https://areajugones.sport.es/wp-content/uploads/2021/08/imagen-2021-08-07-180443-1080x609.jpg.webp"}
            } 

            message.channel.send({embeds: [newEmbed]});
        } else if (args.at(0) === 'days'){
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            if (turcaData.turcaLastMessage !== ""){
                diferencia = Math.floor((new Date() - Date.parse(turcaData.turcaLastMessage)) / _MS_PER_DAY);
                message.channel.send("Llevamos " + diferencia + " días sin mensajes de la turca.");
            } else {
                message.channel.send("No se ha establecido la fecha del último mensaje de la turca.");
            }
        }
    }
}