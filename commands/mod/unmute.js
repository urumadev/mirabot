const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");;
const Guild = require("../../guild.js");
const moment = require("moment")
module.exports = {
    name: "unmute",
    aliases: ['см'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let m = message.mentions.members.first()
        if (!m) return message.reply("укажите пользователя!")
        let member = message.guild.members.cache.get(m.id);
        let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        let role = message.guild.roles.cache.get(guild.mt);
        if (!role) return message.reply("на сервере нет роли мута!");

      if (!member.roles.cache.has(role.id)) return message.reply("**пользователь не в муте!**")
    let user = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID: member.id,guild:member.guild.id });
    user.reason = null;
    user.time = null;
    user.muteinfo = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
  user.unmute  = null;
  user.muted = null;
  user.save().catch(() => {});
    member.roles.remove(role.id).catch(() =>{});
    const emsb = new MessageEmbed()
    
    .setDescription(`**Пользователь <@${member.id}>** был размьючен | модератор **<@${message.member.id}>**`)
    .setColor("BLUE")
    message.channel.send({ embeds: [emsb] }).catch(() => {});
    }
};
