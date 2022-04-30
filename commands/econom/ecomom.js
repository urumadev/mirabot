const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const Shop = require("../../guild.js");
module.exports = {
    name: "econom",
    aliases: ['eco'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    message.delete()
    let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
    let shop = await Shop.findOne({id:message.guild.id}) || new Shop({id:message.guild.id});
    if (!args[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите аргумент!**`}]});
    if (args[0] != "timely" && args[0] != "setcurrency" && args[0] != "add-roulette" && args[0] != "add-slots" && args[0] != "add-timely") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите \`верный\` аргумент!**`}]});
   let n;
   if (args[0] == "add-roulette") n = 1;
   if (args[0] == "add-slots") n = 2;
   if (args[0] == "setcurrency") n = 4;
   if (args[0] == "timely") n = 5;
   
   if (n == 1) {
       message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите минимальное и максимальное значение!**`}]});
       const filter = (msg) => msg.member.id === message.author.id;
       var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
       col1.on("collect", async (m) => { 
           if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
           if (!m.content.split(' ')[1]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
           let a,b;
          a = m.content.split(' ')[0];
          b = m.content.split(' ')[1];
          if (isNaN(a) == true || isNaN(b) == true) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
          a = Number(a); b = Number(b);
          if (a < 1 || b < 1) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
            let max,min;
            max = a,min = b;
            if (b > a) max = b, min = a;
            guild.roulette_max = max;
            guild.roulette_min = min;
            guild.save()
            return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимое значение!**`}]});
        })
   }
   if (n == 2) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите минимальное и максимальное значение!**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        if (!m.content.split(' ')[1]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a,b;
       a = m.content.split(' ')[0];
       b = m.content.split(' ')[1];
       if (isNaN(a) == true || isNaN(b) == true) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
       a = Number(a); b = Number(b);
       if (a < 1 || b < 1) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         let max,min;
         max = a,min = b;
         if (b > a) max = b, min = a;
         guild.slots_max = max;
         guild.slots_min = min;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимое значение!**`}]});
     })
    }

if (n == 4) {
    message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите значок валюты!**` }]});
    const filter = (msg) => msg.author.id === message.author.id;;
    var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => {
        if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
        if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
        let a = m.content.split(' ')[0];
        if (a.length > 32) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите значок меньше 50 символов!**` }]});
        guild.val = a;
        guild.save()
        return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы сменили значок валюты!**` }]});
    })
}
if (n == 5) {
    message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите число!**` }]});
    const filter = (msg) => msg.author.id === message.author.id;;
    var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => {
        if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
        if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
        let a = m.content.split(' ')[0];
        if (isNaN(a) == true || (a && isNaN(a) == false && Number(a) < 1)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите число!**` }]});
        shop.timely = Number(a);
        shop.save();
        return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы сменили зарплату!**` }]});
    })
}
}
};
