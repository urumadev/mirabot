const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
// const Guild = require('../../guild.js');
// const User = require('../../user.js');
// const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "additem",
    aliases: ['ai'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if (!args[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите стоимость товара!**` }]});
     if (!args[1]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите товар!**` }]});
    
      let num = args[0];
      let string = args.join(" ");
      if (isNaN(num) == true || (isNaN(num) == false && (num < 1))) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите \`реальную\` стоимость товара!**` }]});
  let shop = await Shop.findOne({id:message.guild.id}) || new Shop({id:message.guild.id});
      if (string.length > 50) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите длину текста меньше, чем 50 символов!**` }]});
      if (shop.items && shop.items.includes(string)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, данный товар уже есть в магазине!**` }]});
     
      shop.items.push(string);
      num = Number(num)
      shop.items_pr.push(num);
      shop.save();
      return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно \`добавили\` товар в магазин!**` }]});
  },
};
