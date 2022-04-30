const { Message, Client, MessageActionRow, MessageButton} = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../guild.js');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "rpc",
    aliases: ['rpc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
let embed = new MessageEmbed()
.setDescription(`**Нажмите на соответствующую реакцию!**`)
.setThumbnail(message.guild.iconURL())
.setTitle(message.author.username,message.author.avatarURL())
await message.channel.send({embeds:[embed]}).then(msg => {
setTimeout(() => { msg.react('🥌')}, 1000)
setTimeout(() => {msg.react('🧻')}, 2000)
setTimeout(() => {msg.react('✂️')}, 2000)
let page = 0;
let b;
let backwardsFilter = (reaction, user) => reaction.emoji.name === '🥌' && user.id === message.author.id
let forwardsFilter = (reaction, user) => reaction.emoji.name === '🧻' && user.id === message.author.id
let aaaaaaaaaaaaaaaa = (reaction, user) => reaction.emoji.name === '✂️' && user.id === message.author.id
const kk = msg.createReactionCollector( {filter:aaaaaaaaaaaaaaaa,time: 420000}); 
const backwards = msg.createReactionCollector( {filter:backwardsFilter,time: 420000})
const forwards = msg.createReactionCollector({filter:forwardsFilter,time: 420000});
let random = Math.floor(Math.random() * (4 -  1)  + 1);


backwards.on('collect', r => {
  page = 1;
  if (random == 1) b = "🥌";
if (random == 2) b = "🧻";
if (random == 3) b = "✂️";

  if (page == random) {
      let emb = new MessageEmbed()
      .setDescription(`**Ура! Вы победили, выпало ${b}**`)
.setThumbnail(message.guild.iconURL())
.setColor("GREEN")
.setTitle(message.author.username,message.author.avatarURL())
return msg.edit({content:" ",embeds:[emb]})
  }
else {
    let emb = new MessageEmbed()
    .setDescription(`**Жаль! Вы проиграли, выпало ${b}**`)
.setThumbnail(message.guild.iconURL())
.setColor("RED")
.setTitle(message.author.username,message.author.avatarURL())
return msg.edit({content:" ",embeds:[emb]})
}
})
kk.on('collect', r => {
  page =3;
  if (random == 1) b = "🥌";
  if (random == 2) b = "🧻";
  if (random == 3) b = "✂️";

    if (page == random) {
        let emb = new MessageEmbed()
        .setDescription(`**Ура! Вы победили, выпало ${b}**`)
  .setThumbnail(message.guild.iconURL())
  .setColor("GREEN")
  .setTitle(message.author.username,message.author.avatarURL())
  return msg.edit({content:" ",embeds:[emb]})
    }
  else {
      let emb = new MessageEmbed()
      .setDescription(`**Жаль! Вы проиграли, выпало ${b}**`)
  .setThumbnail(message.guild.iconURL())
  .setColor("RED")
  .setTitle(message.author.username,message.author.avatarURL())
  return msg.edit({content:" ",embeds:[emb]})
  }
})

forwards.on('collect', r => {
 
  page = 2;
  if (random == 1) b = "🥌";
  if (random == 2) b = "🧻";
  if (random == 3) b = "✂️";

    if (page == random) {
        let emb = new MessageEmbed()
        .setDescription(`**Ура! Вы победили, выпало ${b}**`)
  .setThumbnail(message.guild.iconURL())
  .setColor("GREEN")
  .setTitle(message.author.username,message.author.avatarURL())
  return msg.edit({content:" ",embeds:[emb]})
    }
  else {
      let emb = new MessageEmbed()
      .setDescription(`**Жаль! Вы проиграли, выпало ${b}**`)
  .setThumbnail(message.guild.iconURL())
  .setColor("RED")
  .setTitle(message.author.username,message.author.avatarURL())
  return msg.edit({content:" ",embeds:[emb]})
  }

})
})
},
};