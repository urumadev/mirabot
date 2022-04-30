const { MessageEmbed } = require('discord.js');
const Guild = require("../../guild.js");
const { stripIndents } = require('common-tags');

module.exports = {
    name: "report",
    aliases: ['r',"репорт"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        const member = message.mentions.members.first();
        let us = new MessageEmbed()
    .setTitle("❌ Ошибка")
  .setDescription(`**${message.author}, Вам необходимо указать пользователя!**`)
    .setTimestamp()
    .setColor("#d30d27")
    if (!member || !args[0]) return message.channel.send({embeds:[us]});
        if (member.id == message.author.id) return message.reply('зачем подавать жалобу на себя?');
        const channel = message.guild.channels.cache.get(guild.report_c)
        const reason = args.slice(1).join(" ");
        if (!reason) return message.reply('укажите текст репорта!');
        if (reason.length < 3) return message.reply('укажите текст репорта более 3 символов!');
        if (!channel) return message.reply("не могу найти канал!")
    let emb = new MessageEmbed()
.setTitle('Жалоба')
.addField('**Автор жалобы:** ',`${message.author}(\`${message.author.tag}\`)`,false)
.addField('**Жалоба на:** ',`<@${member.id}>(\`${member.user.tag}\`)`,false)
.addField('**Канал:** ',`${message.channel}`,false)
.addField(`**Причина жалобы:** `,`${reason}`,false)
.setColor("RANDOM")
.setThumbnail(member.user.avatarURL({ dynamic: true }))
.setTimestamp()
channel.send({embeds:[emb]}).catch(() => { });
message.reply('Ваш репорт был успешно отправлен!');
}
}