const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");;
module.exports = {
    name: "slowmode",
    aliases: ['slowmode'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
            let nwemb = new MessageEmbed()
            .setTitle('Ошибка ❌')
            .setDescription(`**${message.author}, у _меня_ нехватка прав.\nТребуемые права: \`Администратор\`**`)
            .setColor("#d30d27")
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds:[nwemb]});
        let channel = message.mentions.channels.first();
        let time = message.mentions.channels.first() ? args[1] : args[0];
        if (!channel) return message.reply('укажите канал!');
        if (time === "off") {
            if (channel.rateLimitPerUser < 1) return message.reply('в этом канале не стоит медленного режима!');
                await channel.setRateLimitPerUser(0);
                    return message.reply(`в <#${channel.id}> канале убран медленный режим!`);
        }
        if (channel.type !== "GUILD_TEXT") return message.reply('укажите канал с типом: текстовый');
         if (!time) return message.reply("укажите время медленного режима!");
         let toms =  ms(time);
         let result = Math.floor(toms / 1000);
            if (!result) return message.reply('укажите корректное время!\n> Пример: **1m | 30m | 90m**');
            if (result > 21600) return message.reply('укажите время меньше 6 часов!');
                else if  (result < 1) return message.reply('укажите время больше 2 секунд!');
                await channel.setRateLimitPerUser(result).catch(() => {});
                return message.reply(`**на канал <#${channel.id}> был наложен медленный режим в ${humanize(toms,{ language: "ru"})}**`).catch(() => {});
    }
};
