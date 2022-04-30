const { MessageEmbed, WelcomeChannel } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const isimage = require('is-image');
module.exports = {
    name: "welcome",
    aliases: ['w'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
        let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if (!args[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите аргумент!**` }]});
        if (args[0] == "off" || args[0] == "on") {
            guild.welc = args[0];
            guild.save()
            return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
        }
        if (args[0] != "embed" && args[0] != "color" && args[0] != "footer" && args[0] != "title" && args[0] != "channel" && args[0] != "text" && args[0] != "image" && args[0] != "on" && args[0] != 'off') return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите \`верный\` аргумент!**` }]}); let n;
        if (args[0] == "image") n = 1;
        if (args[0] == "text") n = 2;
        if (args[0] == "channel") n = 3;
        if (args[0] == "footer") n = 4;
        if (args[0] == "title") n = 5;
        if (args[0] == "color") n = 6;
        if (args[0] == "embed") n = 7;
       
        if (n == 1) { 
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите текст!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content.split(' ')[0];
                if (a == "off") return guild.wlimage = null, message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
                if (isimage(a) == false) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`корректное\` значение!**` }]});
                guild.wlimage = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
        }
        if (n == 2) {
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите текст!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content;
                if (a.length > 600 || a.length < 1) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите длину текста меньше 600 символов!**` }]});
                guild.wl = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
        }
        if (n == 3) {
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите текст!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
            if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
            if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
            if (m.content.split(' ')[0] == "off") return guild.welc = null, guild.save(),message.reply("успешно!");
            let a = m.content.split(' ')[0].match(/\d+/)[0]
            let channel = message.guild.channels.cache.get(a);
            if (!channel) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
            if (channel.type !== "GUILD_TEXT") return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите канал с типом: \`текстовый\`!**` }]});

            guild.welc = channel.id;
            guild.save()
            return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
        })
    }
    if (n == 4) {
        message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите текст!**` }]});
        const filter = (msg) => msg.author.id === message.author.id;;
        var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
        col1.on("collect", async (m) => {
            if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
            if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
            let a = m.content;
            if (a == "off") return guild.wft = null, message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            if (a.length > 15 || a.length < 1) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите длину текста меньше 25 символов!**` }]});
            guild.wft = a;
            guild.save()
            return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
        })
    }
        if (n == 5) {
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите текст!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content;
                if (a == "off") return guild.wt = null, message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
                if (a.length > 15 || a.length < 1) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите длину текста меньше 25 символов!**` }]});
                guild.wt = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
        }
        if (n == 6) {
            message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, **Укажите \`доступное название или координаты\` цвета!**\n> **Доступные цвета:** красный| зеленый| черный| белый| желтый| синий | фиолетовый | розовый`}]});
            const filter = (msg) => msg.member.id === message.author.id;
            var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => { 
                if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
                if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
                let c;
               c = m.content;
               if (c == "off") guild.wcolor = null,guild.save(),message.reply("успешно!");
            if (!m.content.match(/#?([0-9a-fA-F]{6})/) && (c != "белый" && c != "красный" &&  c != "синий" && c != "черный" && c != "желтый"   && c != "зеленый" && c != "фиолетовый" && c != "розовый")) message.reply('укажите \`реальный\` цвет!');
            let str = c;
               if (c == "белый") str = "#FFFFFF";
               if (c == "красный") str = "#FF0000";
               if (c == "синий") str = "#0000ff";
               if (c == "черный") str ="#000000";
               if (c == "желтый") str = "#ffff00"
               if (c == "зеленый") str = "#008000"
               if (c == "фиолетовый") str = "#8b00ff";
               if (c == "розовый") str = '#ff8fa2';
               guild.wcolor = c;
                 guild.save()
                 return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимое значение!**`}]});
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
                     guild.wemb = a;
                     guild.save()
                     return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
                 })
            }
    }
};
