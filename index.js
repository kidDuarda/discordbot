const fs = require('fs')
const { Client } = require('discord.js')
const client = new Client();
const { token, prefix } = require("./config.json");

client.on('ready', async => {
    console.log('ready');
})

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
})

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let comando = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${comando}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
})


client.login(token)
