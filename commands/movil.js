// MessageEmbed y MessageAttachment
const {MessageEmbed, MessageAttachment} = require('discord.js');
// Librería de acceso a enlaces de YouTube
const ytdl = require('ytdl-core');
// Librería de búsqueda en Youtube
const ytSearch = require('yt-search');
// Librería Discord Music Player
const dmp = require('discord-music-player');
// Path
const path = require('path');

const fs = require('fs'); // fs
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 

module.exports = {
    name: 'movil',
    aliases: ['m'],
    cooldown: 0,
    description: 'Promulga las enseñanzas del Alejandro ebrio.',
    async execute(message, args, cmd, client, Discord){

         // Audio de moimovil
         let audio="resources/mi_telefono_moimoil.mp3";

        // If para ignorar a Alejandro
        if (message.author.username == "Malexba" && Math.random() > 0.95){
            // Creamos el embed message
            const file = new MessageAttachment('resources/anime-tsundere.gif');
            const exampleEmbed = new MessageEmbed()
	            .setColor(env.EMBED_COLOR)
	            .setImage('attachment://anime-tsundere.gif');

            message.channel.send({ embeds: [exampleEmbed], files: [file] });
        } else {

            // Buscamos la cola del servidor
            let guildQueue = client.player.getQueue(message.guild.id);
        
            // Si no existe, creamos una
            if(!guildQueue) {
                guildQueue = client.player.createQueue(message.guild.id);
                await guildQueue.join(message.member.voice.channel).then((connection) => {
                    connection.play(path.join(__dirname, "../resources/mi_telefono_moimoil.mp3"))
                });                
            }

        } 
    }
}