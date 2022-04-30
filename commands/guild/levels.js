const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const isimage = require('is-image');
module.exports = {
    name: "levels",
    aliases: ['lev'],
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
            guild.lvls = args[0];
            guild.save()
            return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
        }
        if (args[0] != "image" && args[0] != "resetlevels" && args[0] != "messagereward" && args[0] != "roledelete" && args[0] != "role" && args[0] != "multiplier") return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите \`верный\` аргумент!**` }]}); let n;
        if (args[0] == "multiplier") n = 1;
        if (args[0] == "role") n = 2;
        if (args[0] == "roledelete") n = 3;
        if (args[0] == "messagereward") n = 4;
        if (args[0] == "resetlevels") n = 5;
        if (args[0] == "image") n = 6;
        if (n == 1) {
            message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите множитель опыта !**`}]});
            const filter = (msg) => msg.member.id === message.author.id;
            var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => { 
                if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
                if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
                let  a = m.content.split(' ')[0];
                if (isNaN(a) == true || (isNaN(a) == false && (a != 0.5 || a != 1 || a != 1.5 || a != 2 || a != 4))) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите число! (\`0.5 | 1 | 1.5 | 2 | 4)\`**`}]});
               guild.multiplier = a;
               guild.save()
                return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили необходимый блок команд!**`}]});
             })
        }
        if (n == 2) {
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите роль и уровень!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                if (m.content.split(' ')[0] == "off") return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно отключили роль!**` }]}), guild.rl = null, guild.save();
                let a = m.content.split(' ')[0].match(/\d+/)[0]
                let role = message.guild.roles.cache.get(a);
                if (!role) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                if (role.managed || (role.position > message.guild.me.roles.highest.position)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                let b = m.content.split(' ')[1].match(/\d+/)[0];
                console.log(b)
                if (!b ) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите во 2 аргументе уровень, за который хотите поставить роль!**` }]});
                if (guild.lvlrole_num.includes(b)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, На этом уровне уже стоит роль!**`}]})
                if (guild.lvlrole.includes(role.id)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Такая роль уже есть!**`}]})
                guild.lvlrole.push(role.id)
                guild.lvlrole_num.push(b);
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы поставили роль за уровень!**` }]});
            })
        }
        if (n == 3) {
            message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите \`on / off\` !**`}]});
            const filter = (msg) => msg.member.id === message.author.id;
            var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => { 
                if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
                if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
                let  a = m.content.split(' ')[0];
                if (isNaN(a) == true ) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите верный номер роли!**`}]});
                if (!guild.roles.includes(a)) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Роли с таким номером нет**`}]});
               let t =  guild.roles.indexOf(a);
               guild.roles.splice(t,1);
               guild.roles_num.splice(t,1)
               guild.save();
                return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы убрали роль за уровень!**`}]});
             })
        }
        if (n == 4) {
            message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите награду за сообщения!**`}]});
            const filter = (msg) => msg.member.id === message.author.id;
            var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => { 
                if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
                if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
                let  a = m.content.split(' ')[0];
                if (a == "off") return guild.messagereward = null,guild.save(),message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили награду за сообщения команд!**`}]});
                if (isNaN(a) == true || (isNaN(a) == false && a < 1)) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Укажите \`верное\` число!**`}]});
               guild.messagereward = a;
               guild.save()
            return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы настроили награду за сообщения команд!**`}]});
             })
        }
        if (n == 5) {
            message.channel.send({embeds: [{color: guild.emb, title:"Ожидание ответа ⚙️",description: `**${message.author}, Укажите в ответе "да" / "+" / "yes", тем самым Вы подтвердите свое решение!**`}]});
            const filter = (msg) => msg.member.id === message.author.id;
            var col1 = await message.channel.createMessageCollector( {filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => { 
                if (!m.content) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, вы не указали значения!**`}]});
                if (!m.content.split(' ')[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не указали значения!**`}]});
                let  a = m.content.split(' ')[0];
                if (a != "+" && a.toLowerCase != "да" && a.toLowerCase != "yes") return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, Вы не подтвердили свой выбор!**`}]});
                return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы сбросили уровни!**`}]});
             })
        }
        if (n == 6) { 
            message.channel.send({ embeds: [{ color: guild.emb, title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите ссылку на фото!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content.split(' ')[0];
                if (a == "off") return guild.rankimage = null, message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
                if (isimage(a) == false) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`корректное\` значение!**` }]});
                guild.rankimage = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
        }
    }
};
