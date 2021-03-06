const {Client, Discord, Intents, Collection} = require('discord.js');
const fs = require('fs'); // fs
const mongoose = require('mongoose'); // API de MongoDB
const env = JSON.parse(fs.readFileSync('src/env.json')); // Fichero de variables de enterno 
const { Player } = require("discord-music-player"); // Discord Music Player

// Discord intents
const myIntents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]);
// Discord client
const client = new Client({intents: myIntents});
// Discord Music Player
client.player = new Player(client);


// List of commands and events
client.commands = new Collection();
client.events = new Collection();

// Require the handlers
['command_handler', 'event_handler'].forEach(handler =>{
    require(`../handlers/${handler}`)(client, Discord);
});

// Conexión con la base de datos de MongoDB
mongoose.connect(env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to the database!')
}).catch((err)=>{
    console.log(err)
});



// ALWAYS last line of the code 
// Token de Discord
client.login(env.BOT_TOKEN);
