const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "addroleitem",
    aliases: ['adi'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.find(x => x.name == args[0]);
     if (!args[1]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите \`стоимость\` товара!**` }]});
    if (!role) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите роль!**` }]});
    let num = args[1];
    if (isNaN(num) == true || (isNaN(num) == false && (num < 1))) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите \`реальную\` стоимость товара!**` }]});
    let shop = await Shop.findOne({id:message.guild.id}) || new Shop({id:message.guild.id});
    if (shop.roles != [] && shop.roles != null && shop.roles.includes(role.id)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, данный товар уже есть в магазине!**` }]});
    num = Number(num)
 
    role = role.id;
    shop.roles.push(role)
    shop.roles_pr.push(num)
    shop.save()
    return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно добавили товар в магазин!**` }]});
  },
};
