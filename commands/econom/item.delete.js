const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
module.exports = {
    name: "itemdelete",
    aliases: ['id'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите в 1 аргументе role / item!**` }]});
      if (!args[1]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите товар, который хотите удалить!**` }]});
    
      let shop = await Shop.findOne({id:message.guild.id}) || new Shop({id:message.guild.id});
      if (args[0] == "role") {
          let role = args[1].match(/\d+/)[0];
          let rl = message.guild.roles.cache.get(role);
         if (!rl) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите роль!**` }]});
            if (!shop.roles.includes(rl.id)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Этой роли нет в магазине!**` }]});
           let p =  shop.roles.indexOf(rl.id);
           shop.roles.splice(p,1);
           shop.roles_pr.splice(p,1)
           shop.save()
           return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно \`удалили\` товар из магазина!**` }]});
        }//.match(/\d+/)[0]
      if (args[0] == "item") {
          let txt = args.splice(1).join(" ");
          if (!shop.items.includes(txt)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Этого товара нет в магазине!**` }]});
          let p =  shop.items.indexOf(txt);
          shop.items.splice(p,1);
          shop.items.pr.splice(p,1)
          shop.save()
          return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно \`удалили\` товар из магазина!**` }]});
        }
  },
};
