const { MessageEmbed, InteractionWebhook, Interaction } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "bot",
    aliases: ['bot'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    message.delete();
    let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
    if (!args[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите аргумент!**`}]});
    if (args[0] != "vt" && args[0] != "ec" && args[0] != "rp" && args[0] != "rec" && args[0] != "nsfw" && args[0] != "moz" && args[0] != "say" && args[0] != "mod") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите \`верный\` аргумент!**`}]});
   let n;
   if (args[0] == "say") n = 1;
   if (args[0] == "mod") n = 3;
   if (args[0] == "moz") n = 4;
   if (args[0] == "nsfw") n = 5;
   if (args[0] == "rec") n = 6;
   if (args[0] == "rp") n = 7;
   if (args[0] == "ec") n = 8;
   if (args[0] == "vt") n = 9;
   if (n == 1) {
       message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
       const filter = (msg) => msg.member.id === message.author.id;
       var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
       col1.on("collect", async (m) => { 
           if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
           if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
           let a;
          a = m.content.split(' ')[0];
        
          if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
            guild.say = a;
            guild.save()
            return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
        })
   }
//    if (n == 2) {
//     message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, **Укажите \`доступное название или координаты\` цвета!**\n> **Доступные цвета:** красный| зеленый| черный| белый| желтый| синий | фиолетовый | розовый`}]});
//     const filter = (msg) => msg.member.id === message.author.id;
//     var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
//     col1.on("collect", async (m) => { 
//         if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
//         if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
//         let c;
//        c = m.content;
//     if (!m.content.match(/#?([0-9a-fA-F]{6})/) && (c != "белый" && c != "красный" &&  c != "синий" && c != "черный" && c != "желтый"   && c != "зеленый" && c != "фиолетовый" && c != "розовый")) nessage.reply('укажите \`реальный\` цвет!');
//        if (c == "off") guild.color = null,guild.save(),message.reply("успешно!");
//        if (c == "белый") str = "#FFFFFF";
//        if (c == "красный") str = "#FF0000";
//        if (c == "синий") str = "#0000ff";
//        if (c == "черный") str ="#000000";
//        if (c == "желтый") str = "#ffff00"
//        if (c == "зеленый") str = "#008000"
//        if (c == "фиолетовый") str = "#8b00ff";
//        if (c == "розовый") str = '#ff8fa2';
//        guild.color = c;
//          guild.save()
//          return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
//      })
// }
if (n == 3) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
     
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.mod = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
if (n == 4) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.moz = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
if (n == 5) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.nsfw = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
if (n == 6) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
     
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.rec = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
if (n == 7) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
     
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.rp = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
if (n == 8) {
    message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите значок валюты!**` }]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
    col1.on("collect",  (m) => {
        if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
        if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
        let a = m.content.split(' ')[0];
        // let a = m.content.join
        if (a == "off") return guild.ec = null,guild.val = null,guild.save(),message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимый блок команд!**` }]});
        if (a.length > 50) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите значок меньше 50 символов!**` }]});
        guild.ec = "on";
        guild.val = a;
        guild.save()
        return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимый блок команд!**` }]});
    })
}
if (n == 6) {
    message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
    const filter = (msg) => msg.member.id === message.author.id;
    var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
    col1.on("collect", async (m) => { 
        if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
        if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
        let a;
       a = m.content.split(' ')[0];
     
       if (a != "on" && a != "off") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верные значения!**`}]});
         guild.vt = a;
         guild.save()
         return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
     })
}
}
};
