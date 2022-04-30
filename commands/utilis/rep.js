const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const Cooldowns = new Map();
var Cooldown = 7200000;
module.exports = {
    name: "rep",
    aliases: ['репутация'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        let member = message.mentions.members.first()
        if (!member) return message.reply("укажите пользователя!");
        let user = await User.findOne({userID:member.id, guild:message.guild.id}) || new User({userID:member.id, guild:message.guild.id});
        var down = Cooldowns.get(message.member.id) || { time: 0 };
        if (down.time + Cooldown > Date.now()) return message.reply('ты сможешь дать себе / другому человеку репутацию всего один раз в 3 часа!');
      Cooldowns.set(message.member.id, { id: message.member.id, time: Date.now() });
      user.rep++;
      user.save()
      return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы успешно далю репутацию пользователю <@${member.id}!**`}]});
      
    }
};
