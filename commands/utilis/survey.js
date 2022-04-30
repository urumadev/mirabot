const { Message, Client, MessageActionRow, MessageButton} = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../guild.js');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "survey",
    aliases: ['survey'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
let txt = args.join(" ") || "пусто";
if (args[0] == "1" && args[0]) txt = args.slice(2).join(" "); 
if (args[0] == "2" && args[0]) txt = args.slice(2).join(" "); 
if (args[0] == "3" && args[0]) txt = args.slice(2).join(" "); 

let emb = new MessageEmbed()
.setTitle(`**Голосование**`)
.setDescription( stripIndents `${txt}`)
.setColor("RED")
.setThumbnail(message.guild.iconURL({dynamic:true}))
await message.channel.send({embeds:[emb]}).then(async (a) => {
    setTimeout(() => { a.react('1️⃣')}, 1000)
 if (args[0] == "2" && args[0])  setTimeout(() => {a.react('2️⃣')}, 2000)
 if (args[0] == "3" && args[0])     setTimeout(() => {a.react('2️⃣')}, 2000),  setTimeout(() => {a.react('3️⃣')}, 3000)
 if (args[0] == "4" && args[0])     setTimeout(() => {a.react('2️⃣')}, 2000),  setTimeout(() => {a.react('3️⃣')}, 3000), setTimeout(() => {a.react('4️⃣')}, 4000)
 if (args[0] == "5" && args[0])     setTimeout(() => {a.react('2️⃣')}, 2000),  setTimeout(() => {a.react('3️⃣')}, 3000), setTimeout(() => {a.react('4️⃣')}, 4000), setTimeout(() => {a.react('5️⃣')}, 5000)
})
},
};