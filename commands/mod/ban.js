const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "ban",
    aliases: ['ban'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let m = message.mentions.members.first();
        if (!m) return message.reply("укажите пользователя!");
        let member = message.guild.members.cache.get(m.id);
        let reason = args.slice(1).join(" ") || "без причины";
        if (member.id == message.member.id) return message.reply("**Зачем банить себя?!**")
        let embeddm = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Вы были забанены модератором ${message.author.username}\n По причине **\`${reason}\`**` )
        .setTimestamp();
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Пользователь \`${member.user.username}\` был забанен модератором \`${message.author.tag}\``)
        .addField(`**Причина:**`, `**\`${reason}\`**`)
        .setTimestamp();
       
        await  member.ban({reason:reason});
        await message.channel.send({embeds:[embed]}).catch(() => {});
        await member.send({embeds:[embeddm]}).catch(() =>{});
    }
};
