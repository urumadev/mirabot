const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const ms = require('ms');
const moment = require("moment");
module.exports = {
    name: "nick",
    aliases: ['ник'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    let m = message.mentions.members.first();
    if (!m) return message.reply("укажите пользователья!")
    let member = message.guild.members.cache.get(m.id);
    if (!args[1] || (args[1] && args[1].length > 30)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите ник пользователя! Его длина должна быть < 32 символов!**` }]});
    if (member.id == message.member.id) return message.reply('эй, не надо менять себе ник!');
  await member.setNickname(nick).catch(err => message.channel.send({embeds: [{color: embc.emb, description: `Произошла неизвестная ошибка! \`${err}\``}]}));
  return message.channel.send({embeds: [{color: "#9211cb", description: `Ник у **${user.tag}** был успешно изменен на **${nick}**\n\nИзменил ник: ${message.author.tag}`}]});

}
};
