const { MessageEmbed } = require("discord.js");
const Discord = module.require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "sayembed",
    aliases: ['сейэмбед'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
        const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if (guild.sayrole != null) {
          let ere = new MessageEmbed()
              .setTitle(`❌ Ошибка`)
              .setColor("#d30d27")
              .setThumbnail()
              .setDescription(`${message.author}, Вам необходимы права \`Управлять сообщениями\`!`)
          if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({embeds:[ere]});
          let er = new MessageEmbed()
              .setTitle(`❌ Ошибка`)
              .setColor("#d30d27")
              .setThumbnail()
              .setDescription(`${message.author}, у Вас нехватка прав!`)
          if (message.content.includes('@everyone' || '@here') && !message.member.permissions.has("MENTION_EVERYONE")) return message.channel.send({embeds:[er]});
          //
          let err = new MessageEmbed()
              .setTitle(`❌ Ошибка`)
              .setColor("#d30d27")
              .setThumbnail()
              .setDescription(`${message.author}, _мне_ необходимы права \`Упоминать @everyone / @here\`!`)
          if (message.content.includes('@everyone' || '@here') && message.guild.me.permissions.has("MENTION_EVERYONE")) return message.channel.send({embeds:[err]});
      };
          let botmessage = args.join(" ");
          if (!botmessage) return message.reply('укажите что-то!');
          const embed = new MessageEmbed()
          .setDescription(`${botmessage}`)
          .setColor(message.member.roles.highest.hexColor)
         
          message.channel.send({ embeds: [embed] }).catch(() => {});
      
    }
};
