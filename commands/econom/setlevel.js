const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "setlevel",
    aliases: ['ad'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      let member = message.mentions.members.first();
        let us = new MessageEmbed()
        .setTitle("❌ Ошибка")
      .setDescription(`**${message.author}, Вам необходимо указать пользователя!**`)
      .setColor("#d30d27")
        .setTimestamp()
        if (!member) return message.channel.send({embeds:[us]});
        if (!args[1] || (args[1] && isNaN(args[1]) == true)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите уровень!**` }]});
        let user = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID: member.id,guild:member.guild.id });
        user.level = Number(args[1]);
        user.save()
         message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы установили уровень \`${args[1]}\` пользователю \`${member.user.username}\`**` }]});
  let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
message.roles = guild.lvlrole;
if (message.roles != []) {
    if (!message.roles || message.roles == []) return;
    if (message.roles.length < 4) return;
    let role = guild.lvlrole.indexOf(user.level);
    if (!role) return;
    role = message.guild.roles.cache.get(role);
    if (message.member.roles.cache.has(role.id)) return;
    message.member.roles.cache.get(role.id);
} 

},
};