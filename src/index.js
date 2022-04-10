const {Client, Discord, Intents, Collection, MessageEmbed} = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const env = JSON.parse(fs.readFileSync('src/env.json'));

// Discord intents
const myIntents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]);
const client = new Client({intents: myIntents});


// List of commands and events
client.commands = new Collection();
client.events = new Collection();

// Require the handlers
['command_handler', 'event_handler'].forEach(handler =>{
    require(`../handlers/${handler}`)(client, Discord);
});

mongoose.connect(env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to the database!')
}).catch((err)=>{
    console.log(err)
});



// ALWAYS last line of the code 
client.login(env.BOT_TOKEN);
