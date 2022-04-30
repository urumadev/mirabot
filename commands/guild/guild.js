const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed} = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const { stripIndents } = require('common-tags');
module.exports = {
    name: "guild",
    aliases: ['g'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // message.delete()
  
        let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if (!args[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите аргумент!**` }]});
        if (args[0] != "bot-role" && args[0] != "warns" && args[0] != "color" && args[0] != "reportchannel" && args[0] != "prefix" && args[0] != "stats" && args[0] != "muterole" && args[0] != "log" && args[0] != "ideachannel" && args[0] != "anti-invite" && args[0] != "auto-role"  && args[0] != "privat") return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите \`верный\` аргумент!**` }]}); 
        let n = 0;
        if (args[0] == "anti-invite") n = 1;
        if (args[0] == "auto-role") n = 2;
        if (args[0] == "bot-role") n = 3;
        if (args[0] == "privat") n = 4;
        if (args[0] == "ideachannel") n = 5;
        if (args[0] == "log") n = 6;
        if (args[0] == "muterole") n = 7;
        if (args[0] == "stats") n = 8;
        if (args[0] == "prefix") n = 9;
        if (args[0] == "reportchannel") n = 10;
        if (args[0] == "color") n = 11;
        if (args[0] == "warns") n = 12;
        if (n == 0) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, укажите \`верный\` аргумент!**` }]}); 
        if (n == 1) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите включить / выключить!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content.split(' ')[0];
                if (a != "включить " && a != "выключить") return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`корректное\` значение!**` }]});
                guild.invite = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
        if (n == 2) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите роль!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                if (m.content.split(' ')[0] == "off") return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно отключили роль!**` }]}), guild.rl = null, guild.save();
                if (m.content.split(' ')[0].replace(/\D+/g,"") == 0) return  message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите верную роль!**` }]});
                let a = m.content.split(' ')[0].match(/\d+/)[0]
                let role = message.guild.roles.cache.get(a);
                if (!role) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                if (role.managed || (role.position > message.guild.me.roles.highest.position)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});

                guild.rl = role.id;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
        if (n == 3) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите роль!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                if (m.content.split(' ')[0] == "off") return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно отключили роль!**` }]}), guild.bt = null, guild.save();
                let a = m.content.split(' ')[0].match(/\d+/)[0]
                let role = message.guild.roles.cache.get(a);
                if (!role) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                if (role.managed || (role.position > message.guild.me.roles.highest.position)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});

                guild.bt = role.id;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
            if (n == 4) {
             
               
                message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите канал или \`off\`!**` }]});
            
                const filter = (msg) => msg.member.id === message.author.id;
                var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
                col1.on("collect", async (m) => {
                    let v = m.content.split(' ')[0];
                 
                    if (v == "off" && !guild.cvc) return message.reply("тебе нечего отключать!")
                    if (guild.cvc && v == "off") {
           
                        let channel = client.channels.cache.get(guild.cvc);
                        if (!channel) return;
                        if (channel) {
                            channel.delete().catch(() => { });

                            channel.parent.delete().catch(() => { });
                        };

                        guild.cvc = null;
                        guild.parent = null;
                        guild.save().catch(() => { })
                        const embd = new MessageEmbed()
                            .setDescription(`**✅Ты успешно выключил отображение приватных комнат🔒**`)
                            .setColor('#0e0d92')
                        message.channel.send({ embeds: [embd] });
                        ////////////////////////////////////

                        ////////////////////////////////////
                        return;
                    }
                    if (m.content.split(' ')[0].replace(/\D+/g,"") ==  0) return  message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите верный канал!**` }]});
                    let a = m.content.split(' ')[0].match(/\d+/)[0];
                    let channel;//split(' ')[0];
                    if (a) channel = message.guild.channels.cache.get(a);
                    if (a && !channel) return message.reply("укажите верный канал!")
                   
                   
                   
                    if (!guild.cv && !a) return message.reply("укажите канал!");
                    let parent = await message.guild.channels.cache.find(x => x.name == "Приватные кoмнаты" && x.type == "GUILD_CATEGORY") || await message.guild.channels.create("Приватные кoмнаты", { type: "GUILD_CATEGORY" });
                    const ch = await message.guild.channels.create('Создать канал (+)', {
                        type: "GUILD_VOICE", parent: parent, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                                 },
                            {
                                id: message.member.id,
                                allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MOVE_MEMBERS'],
                            },
                        ],
                    });

                    const button1 = new MessageButton()
                        .setEmoji("<:voice_1:939930696191971328>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__1");
                    const button2 = new MessageButton()
                        .setEmoji("<:voice__2:939930683890085888>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__2");
                    const button3 = new MessageButton()
                        .setEmoji("<:voice__3:939930674557763644>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__3");
                    const button4 = new MessageButton()
                        .setEmoji("<:voice__4:939930665053483081>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__4");
                    const button5 = new MessageButton()
                        .setEmoji("<:voice_5:939930656174129232>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__5");
                    const button6 = new MessageButton()
                        .setEmoji("<:voice_6:939930645759688735>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__6");
                    const button7 = new MessageButton()
                        .setEmoji("<:voice_7:939930638448996382>")
                        .setStyle("SECONDARY")
                        .setCustomId("voice__7");
                    const buttons1 = new MessageActionRow()
                        .addComponents(button1)
                        .addComponents(button2)
                        .addComponents(button3)
                    const buttons2 = new MessageActionRow()
                        .addComponents(button4)
                        .addComponents(button5)
                        .addComponents(button6)
                        .addComponents(button7)
                    let emb = new MessageEmbed()
                        .setTitle("**Настройка комнат**")
                        .setColor("#fadadd")
                        .setDescription(stripIndents`**
                    Настройка войса:
                    <:voice_1:939930696191971328> - сменить название канала
                    <:voice_2:939930683890085888> - выбрать количество участников
                    <:voice_3:939930674557763644> - пригласить в канал пользователя.

Модерация войса:
<:voice_4:939930665053483081> - кикнуть участника из голосового канала;
<:voice_5:939930656174129232> - отключить микрофон пользователю;
<:voice_6:939930645759688735> - заблокировать пользователя;
<:voice_7:939930638448996382> - передать права другому пользователю.**`)
                        .setThumbnail(message.guild.iconURL({dynamic:true}))
                        .setFooter({text:message.guild.name})
                     await channel.send({ embeds: [emb], components: [buttons1, buttons2] });
                    guild.privat_channel = channel.id;
                    guild.cvc = ch.id;
                    guild.parent = ch.parentId;
                    guild.save().catch(() => { });
                    const embed = new MessageEmbed()
                        .setDescription(`**✅Ты успешно включил отображение приватных комнат🔓**`)
                        .setColor("#008000")
                    message.channel.send({ embeds: [embed] }).catch(() => { });
                })
                col1.on("end", async () => {
                
                })
            }
            if (n == 5) {
                message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите канал!**` }]});
                const filter = (msg) => msg.author.id === message.author.id;;
                var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
                col1.on("collect", async (m) => {
                    if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                    if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                    if (m.content.split(' ')[0] == "off") guild.idea = null, guild.save();
                    let a = m.content.split(' ')[0].match(/\d+/)[0]
                    let channel = message.guild.channels.cache.get(a);
                    guild.idea = channel.id;
                    guild.save()
                    const embd = new MessageEmbed()
                        .setDescription(`**✅Ты успешно поставил канал для идей!**`)
                        .setColor('#0e0d92')
                    message.channel.send({ embeds: [embd] });
                    return;
                })
                col1.on("end", async () => {
                
                })
            }
            if (n == 6) {
                message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите роль!**` }]});
                const filter = (msg) => msg.author.id === message.author.id;;
                var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
                col1.on("collect", async (m) => {
                    if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                    if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                    if (m.content.split(' ')[0] == "off") guild.logs = null, guild.save();
                    if (m.content.split(' ')[0].replace(/\D+/g,"") == 0) return  message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите верную роль!**` }]});
                    let a = m.content.split(' ')[0].match(/\d+/)[0]
                    let channel = message.guild.channels.cache.get(a);
                    if (!channel) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                    if (channel.type !== "GUILD_TEXT") return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите канал с типом: \`текстовый\`!**` }]});

                    guild.logs = channel.id;
                    guild.save()
                    return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
                })
                col1.on("end", async () => {
                
                })
            }
            if (n == 7) {
                message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите роль!**` }]});
                const filter = (msg) => msg.author.id === message.author.id;;
                var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
                col1.on("collect", async (m) => {
                    if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                    if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                    if (m.content.split(' ')[0] == "off") return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно отключили роль!**` }]}), guild.mt = null, guild.save();
                    let a = m.content.split(' ')[0].match(/\d+/)[0]
                    let role = message.guild.roles.cache.find(x => x.id === a)
               
                    if (!role) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                    if (role.managed || (role.position > message.guild.me.roles.highest.position)) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали \`верную\` роль!**` }]});
                    guild.mt = role.id;
                    guild.save()
                   
                    return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
                })
                col1.on("end", async () => {
                
                })
            }
            if (n == 8) {
                if (guild.online || guild.members || guild.offline) {
                    const online = message.guild.channels.cache.get(guild.online);
                    const members = message.guild.channels.cache.get(guild.members);
                    const offline = message.guild.channels.cache.get(guild.offline);
                    if (online) {
                        setTimeout(() => { if (online.parent) online.parent.delete() }, 1000)
                        setTimeout(() => { online.delete() }, 2000)
                    };
                    if (members) {
                        setTimeout(() => { if (members.parent) members.parent.delete() }, 3000)
                        setTimeout(() => { members.delete() }, 4000)

                    };
                    if (offline) {
                        setTimeout(() => { if (offline.parent) offline.parent.delete() }, 5000)
                        setTimeout(() => { offline.delete() }, 6000)
                    };
                    const embed = new MessageEmbed()
                        .setDescription("Система мониторинга сервера успешно отключена!🔓")
                        .setColor("#36393E")
                        .setFooter({text:`${message.author.username}`,iconURL:message.author.avatarURL({ dynamic: true })});
                    guild.online = null;
                    guild.members = null;
                    guild.offline = null;
                    return guild
                        .save()
                        .then(() => message.channel.send({ embeds: [embed] }))
                }
         
            let parent = await message.guild.channels.create("📊Статистика📊", {
                type: "GUILD_CATEGORY",
            });
           let members = await message.guild.channels.create(
                `Участники: ${message.channel.guild.memberCount}`,
                {
                    type: "GUILD_VOICE",
                    parent: parent,
                    reason: "Monitoring",
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["CONNECT", "SPEAK"],
                        },
                    ],
                })
       
           
                let online = await message.guild.channels.create(
                `Онлайн: ${message.guild.members.cache.filter(m => (m.presence && (m.presence.status == "online" ||m.presence.status == "dnd" || m.presence.status== "idle" ))).size
                }`,
                {
                    type: "GUILD_VOICE",
                    parent: parent,
                    reason: "Monitoring",
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                           allow: ['VIEW_CHANNEL'],
            deny: ["CONNECT", "SPEAK"],
                        },
                    ],
                })

            
            let offline = await message.guild.channels.create(
                `Оффлайн: ${message.guild.memberCount - message.guild.members.cache.filter(m => (m.presence && m.presence.status == "online")).size
                }`,
                {
                    type: "GUILD_VOICE",
                    parent: parent,
                    reason: "Monitoring",
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["CONNECT", "SPEAK"],
                        },
                    ],
                }
            );
            guild.online = online.id;
            guild.members = members.id;
            guild.offline = offline.id;
            const embed = new MessageEmbed()
                .setDescription("Система мониторинга сервера успешно включена!🔓")
                .setColor("#36393E")
                .setFooter({text:`${
                    message.member.username}`,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });
            guild
                .save()
                .then(() => message.channel.send({ embeds: [embed] }))
                .catch((e) => console.log(`[cv.js] ${e}`))
            
    }
        if (n == 9) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите префикс!**` }]});
            const filter = (msg) => msg.author.id == message.author.id;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content.split(' ')[0];
                if (a.length > 4) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите значок меньше 4 символов!**` }]});
                guild.prefix = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
        if (n == 10) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите канал!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                if (m.content.split(' ')[0] == "off") return guild.report_c = null, guild.save(), message.reply("Вы успешно удалили настройки!");
                if (m.content.split(' ')[0].replace(/\D+/g,"") == 0) return  message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Укажите верный канал!**` }]});
                let a = m.content.split(' ')[0].match(/\d+/)[0]
                let channel = message.guild.channels.cache.get(a);
                if (!channel) return message.reply("не могу найти канал!")
                
                guild.report_c = channel.id;
                guild.save()
               
                const embd = new MessageEmbed()
                    .setDescription(`**✅Ты успешно поставил канал для репортов!**`)
                    .setColor('#0e0d92')
                message.channel.send({ embeds: [embd] });
             
            })
            col1.on("end", async () => {
                
            })
        }
        if (n == 11) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, **Укажите \`доступное название или координаты\` цвета!**\n> **Доступные цвета:** красный| зеленый| черный| белый| желтый| синий | фиолетовый | розовый` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                let c;
                c = m.content;
                if (c == "off") guild.color = null, guild.save(), message.reply("успешно!");
                if (!m.content.match(/#?([0-9a-fA-F]{6})/) && (c != "белый" && c != "красный" && c != "синий" && c != "черный" && c != "желтый" && c != "зеленый" && c != "фиолетовый" && c != "розовый")) message.reply('укажите \`реальный\` цвет!');
                let str = c;
                if (c == "белый") str = "#FFFFFF";
                if (c == "красный") str = "#FF0000";
                if (c == "синий") str = "#0000ff";
                if (c == "черный") str = "#000000";
                if (c == "желтый") str = "#ffff00"
                if (c == "зеленый") str = "#008000"
                if (c == "фиолетовый") str = "#8b00ff";
                if (c == "розовый") str = '#ff8fa2';
                guild.emb = c;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
        if (n == 12) {
            message.channel.send({ embeds: [{ color: "#36393E", title: "Ожидание ответа ⚙️", description: `**${message.author}, Укажите включить / выключить!**` }]});
            const filter = (msg) => msg.author.id === message.author.id;;
            var col1 = await message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                if (!m.content) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значения!**` }]});
                if (!m.content.split(' ')[0]) return message.channel.send({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**${message.author}, Вы не указали значение!**` }]});
                let a = m.content.split(' ')[0];
                let b = m.content.split(' ')[1];
                ///
                if (!a) return message.reply('**ты забыл указать допустимое кол-во нарушений (число / off)!**');
                if (isNaN(a) == true && a != 'off') return message.reply(`укажите в нулевом аргументе <число> / off\n> **Пример: ${guild.prefix}warnslimit 2 ban**`);
                if (a == 'off' && guild.warnslimit == null) return message.reply('у вас и так выключен счетчик варнов!');
                if (a == 'off') return guild.warnslimit = null, guild.nk = null, guild.save(), message.reply('вы успешно отключили лимит варнов!');
                if (isNaN(a) == true) return message.reply('укажите число!');
                if (isNaN(a) == false && a < 1 && a > 20) return message.reply('укажите лимит нарушений от 1 до 20!');
                if (a != 'off' && !b) return message.reply('**в первом аргументе укажите "ban"/"kick" !**');
                if (a != 'off' && b != 'kick' && b != 'ban') message.reply('**в первом аргументе укажите "ban"/"kick" !**');
                a = Number(a);
                guild.nk = b;
                guild.warnslimit = a;
                guild.save()
                return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы настроили необходимое значение!**` }]});
            })
            col1.on("end", async () => {
                
            })
        }
    },
};
