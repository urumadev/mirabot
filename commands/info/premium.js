const User = require('../../user.js');
const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed, MessageSelectMenu} = require("discord.js");
const Guild= require('../../guild.js');
const Prem = require("../../prem.js")
const { stripIndents } = require('common-tags');
const ms = require("ms")
module.exports = {
    name: "prem",
    aliases: ['prem'],
    run: async (client, message, args) => {
        if (message.author.id != "375274737103798282") return;
        if (!args[0] || !args[1]) return;
        if (args[0] == "on") {
            let prem = await Prem.findOne({guild:args[1]}) || new Prem({guild:args[1]});
            let timestamp = new Date().getTime();
let mutedUntil = new Date();
mutedUntil.setTime(timestamp + ms(time));
prem.date = mutedUntil;
prem.stat = true;
prem.save().catch(() => {});

return message.reply(prem + "\n\n\`готово\`");
        }
        if (args[0] == "off") {
            let prem = await Prem.findOne({guild:args[1]}) || new Prem({guild:args[1]});
prem.date = null;
prem.stat = false;
prem.save().catch(() => {});

return message.reply(prem + "\n\n\`готово\`");
        }
        
    },
        }
