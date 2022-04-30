const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "dopitem",
    aliases: ['dopi'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
       if (isNaN(args[0]) == true || (isNaN(args[0]) == false && (args[0] < 1 || args[0] > 2))) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите число от 1 до 3!**`}]});
       let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id})
       if (args[0] == 1) {
            if (!args[1] || (isNaN(args[1]) == false && (args[1] < 1))) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите стоимость личной роли!**`}]});
            guild.dop_item1 = Number(args[1]);
            guild.save()
            return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили дополнительный предмет!**`}]});
        }
        if (args[0] == 2) {
            if (!args[1] || (isNaN(args[1]) == false && (args[1] < 1))) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите стоимость лав-рум!**`}]});
            guild.dop_item2 = Number(args[1]);
            guild.save()
            return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили дополнительный предмет!**`}]});
        }
  },
};
