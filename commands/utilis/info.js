const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
let strftime = require("strftime")
module.exports = {
    name: "info",
    aliases: ['info'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
        const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if (!args[0]) return message.reply('укажите id пользователя!');
        if (isNaN(args[0]) == true) return message.reply('укажите id пользователя!');
        if (args[0].length < 10) return message.reply('**укажите действительный id пользователя!**');
        let user =   await client.users.fetch(args[0]);
        let stat = {
          online: "https://emoji.gg/assets/emoji/9166_online.png",
          idle: "https://emoji.gg/assets/emoji/3929_idle.png",
          dnd : "https://emoji.gg/assets/emoji/2531_dnd.png",
          offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
        };
        let day = 1000 * 60 * 60 * 24
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(user.createdAt)
        let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
       
          let embed = new MessageEmbed()
          embed.setTitle('**Информация о пользователе**')
           embed.addField("**Имя**", user.tag)
          .setColor(guild.emb)
            .addField("**Дата создания аккаунта**",`${strftime('%d.%m.%Y в %H:%M', new Date(user.createdAt))} (${diff1} дней назад)`)
            .addField('**ID пользователя**', user.id,true)
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .setFooter({text:user.presence.status,iconURL:stat[user.presence.status ]})// .setFooter(user.presence.status, stat[user.presence.status])
          message.channel.send({embeds:[embed]}).catch(() => {});
      
        
    }
};
