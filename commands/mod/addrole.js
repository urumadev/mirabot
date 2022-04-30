const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const ms = require('ms');
const moment = require("moment");
const Guild = require("../../guild.js");
module.exports = {
    name: "addrole",
    aliases: ['addrole'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
      const m = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      let us = new MessageEmbed()
      .setTitle("❌ Ошибка")
      .setDescription(`${message.author}, Вам необходимо указать пользователя!`)
      .setTimestamp()
      if (!m) return message.channel.send({embeds:[us]});
      let member = message.guild.members.cache.get(m.id)
      const embc = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
      args[1] = message.mentions.roles.first();
      role = args[1];
      if (!role) return message.reply('укажите роль, которую хотите добавить!');
      if(member.roles.cache.has(role.id)) return message.reply('у этого пользователя уже есть эта роль!');
      e = role.position;
      a = message.guild.me.roles.highest.position;
      let ess = new MessageEmbed()
      .setDescription('Поставьте роль бота выше, чем роль, которую хотите выдать!')
      .setColor(embc.emb)
      if (e > a) return message.channel.send({embeds:[ess]});
      p = member.roles.highest.position
      b = message.guild.me.roles.highest.position;
      let esss = new MessageEmbed()
      .setDescription('Поставьте роль бота выше, чем данного пользователя!')
      .setColor(embc.emb)
      if (p > b || p == b) return message.channel.send({embeds:[esss]});
      if (role.managed) return message.reply('я не могу выдавать эту роль, т.к она управляется интеграцией!');
        member.roles.add(role.id).catch(() =>{});
        message.reply('я успешно выдал роль данному пользователю!');
      
    }
};
