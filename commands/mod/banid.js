const { Message, Client } = require("discord.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "banid",
    aliases: ['b'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async (client, message, args) => {
    if(message.guild.me.permissions.has("MANAGE_MESSAGE")) message.delete();
      let member = args[0];
      if(!member) return message.reply('**укажите id пользователя!**');
      if(isNaN(member)) return message.reply('**укажите верный id пользователя!**');
      if(member === message.author.id) return  message.reply('**не нужно банить себя!**');
      let reason = args.splice(1).join(' ');
      if(!reason) reason = 'без причины';
      // if (message.guild.members.cache.get(member) && message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('**не нужно банить модератора!**');
      message.guild.fetchBans().then(async bans => {
          let bUser = bans.find(b => b.user.id == member)
          if (bUser) return message.reply('данный пользователь в бане!');
      client.users.fetch(member).then(async user => {
          // if(user.bannable) return message.reply('я не могу забанить даного пользователя, возможно его роль выше моей!');
          if(message.guild.members.cache.get(member) && message.member.permissions.has("BAN_MEMBERS")) return  message.reply('**не нужно банить модератора!**');
          if (message.member.user.bot == true) return message.reply('не нужно банить бота!');
          await message.guild.members.ban(user.id,{reason:reason});
          return message.reply(`<@${member}>(**${args[0]}**) был забанен!`);
      }).catch(err => {
          if (err == "DiscordAPIError: Unknown User") err = "Пользователь не найден";
          if (err == "DiscordAPIError: Missing Permissions") err = "Нехватка прав";
          return message.reply(`произошла ошибка: **${err}**`);
      });
      });
     }
    }