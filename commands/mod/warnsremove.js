const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "warnremove",
    aliases: ['ув'],
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
        let number = Number(args[1])
        let kol = number || 1;
    let user = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID: member.id,guild:member.guild.id });
  if (user.warns - kol < 0) return message.reply("**Вы не можете снять столько варнов!**")
    user.warns = user.warns - kol;
    user.save()
   const emb = new MessageEmbed()
   .setDescription(`**${message.author.username}, Вы успешно забрали варны у пользователя: ${member.user.tag}**`)
   .setColor("GREEN")
message.channel.send({ embeds: [emb] });
    }
};
