


module.exports = {
    name: 'turca',
    description: "Maneja el contador de días sin mensajes de la turca.",
    execute(message, args){
        const MongoClient = require('mongodb').MongoClient;
        const fs = require('fs');
        const env = JSON.parse(fs.readFileSync('src/env.json'));

        if (args.at(0) === 'reset') {
            var date = new Date();
            MongoClient.connect(env.MONGODB_SRV, function(err, client){
                console.log('Connected to the database!')
                var cursor=client.db('BabamboDB').collection('turcaCounter').find({serverID: message.guild.id});
                if (!cursor.hasNext()){
                    client.db('BabamboDB').collection('turcaCounter').insertOne({
                        serverID: message.guild.id,
                        turcaLastMessage: date
                    });
                } else {
                    client.db('BabamboDB').collection('turcaCounter').updateOne({
                        "serverID": message.guild.id
                        }, {
                        $set: {
                        "turcaLastMessage": date
                        }
                        });
                }
            });

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

            message.channel.send({embeds: [newEmbed]});
        } else if (args.at(0) === 'days'){
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;

            MongoClient.connect(env.MONGODB_SRV, function(err, client){
                console.log('Connected to the database!');
                var cursor = client.db('BabamboDB').collection('Employee').find();

                if (cursor.hasNext()){
                    diferencia = Math.floor((new Date() - Date.parse(cursor.Next().turcaLastMessage)) / _MS_PER_DAY);
                    message.channel.send("Llevamos " + diferencia + " días sin mensajes de la turca.");
                } else {
                    message.channel.send("No se ha establecido la fecha del último mensaje de la turca.");
                }
            });
            
        }
    }
}