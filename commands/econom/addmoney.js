const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "addmoney",
    aliases: ['am'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        let neemb = new MessageEmbed()
        .setTitle('Ошибка ❌')
        .setDescription(`**${message.author}, у _меня_ нехватка прав.\nТребуемые права: \`Управлять сервером\`**`)
        .setColor("#d30d27")
        if(!message.guild.me.permissions.has('MANAGE_GUILD')) return message.channel.send({embeds:[neemb]});
          let nemb = new MessageEmbed()
       .setTitle('Ошибка ❌')
       .setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Управлять сервером\`**`)
       .setColor("#d30d27")
       if(!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send({embeds:[nemb]});
        let member = message.mentions.members.first();
        let us = new MessageEmbed()
        .setTitle("❌ Ошибка")
      .setDescription(`**${message.author}, Вам необходимо указать пользователя!**`)
      .setColor("#d30d27")
        .setTimestamp()
        if (!member) return message.channel.send({embeds:[us]});
        let user = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID: member.id,guild:member.guild.id });
        if (!args[1])  return message.reply('укажите сумму, которую хотите добавить пользователю!');
        if (args[1] % 1 != 0) return message.reply('укажите корректную сумму!');
    
        if (args[1].length > 10) return message.reply('укажите сумму меньше!');
       user.withmoney = user.withmoney + Number(args[1]);
       user.save(); 

      let emb = new MessageEmbed()
      .setDescription(`${message.author}, Вы успешно выдали ${args[1]} ${guild.val} пользователю ${member.user.username}`)
      message.channel.send({embeds:[emb]})
    },
};
