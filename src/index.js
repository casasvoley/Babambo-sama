const {Client, Discord, Intents, Collection, MessageEmbed} = require('discord.js');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
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

// Get all the command files
/* const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`../commands/${file}`);

    client.commands.set(command.name, command);
} */

/* client.once('ready', () => {
    console.log('Bot is online!');
}); */

// For each message
client.on('messageCreate', message =>{
    // If it does not start with the prefix or it is a message from the bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Remove the prefix and split by the spaces 
    const args = message.content.slice(prefix.length).split(/ +/);
    // Take elemnt 0 to lowercase
    const command = args.shift().toLowerCase();

    // Command behaviour
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args, MessageEmbed);
    } else if (command === 'help'){
        client.commands.get('help').execute(message, args, MessageEmbed);
    } else if (command === "turca"){
        client.commands.get('turca').execute(message, args);
    }
});

MongoClient.connect(env.MONGODB_SRV, function(err, client){
    console.log('Connected to the database!');
});

/*mongoose.connect(env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to the database!')
}).catch((err)=>{
    console.log(err)
});*/



// ALWAYS last line of the code 
client.login(env.BOT_TOKEN);
