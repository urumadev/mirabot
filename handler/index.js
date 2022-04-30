const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
let Cron = require("cron").CronJob;
const globPromise = promisify(glob);
const User = require('../user.js');
const config = require("../config.json")
const { REST } = require('discord.js');
const clientId = '952618150669742171';
const moment = require("moment")
const Guild = require("../guild.js")
/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);

    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
      
            if (!file.name) return;
            const properties = { directory, ...file };
            console.log(file.name)
            client.commands.set(file.name, properties);
        
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];


    slashCommands.map((value) => {
        const file = require(value);
        if (!file) return;
        if (!file?.name) return;
        if (!file.description) return;
   
        console.log(file.name)
     
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.guilds.cache
        .get("965554396345798747")
        .commands.set(arrayOfSlashCommands);

    });

    // mongoose
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb+srv://Kitekat:Manrol1971@cluster0.vlbn9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        
    })
        .catch((e) => console.log('[index.js] ' + e)),console.log("есть подключение");
};

