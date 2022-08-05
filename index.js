const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client(); 
const config = require("./config.json"); 

client.on('ready', async  => {

  console.log(`Bot iniciado -AlphaRD.`);
})
  
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
        
  
  client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
  
    let comando = message.content.split(" ")[0];
    comando = command.slice(config.prefix.length);
  
    let args = message.content.split(" ").slice(1);
  
    try {
      let commandFile = require(`./comandos/${comando}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  })


  })

client.login(config.token)