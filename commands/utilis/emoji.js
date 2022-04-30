const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const Discord = require("discord.js")
const { parse } = require("twemoji-parser");
module.exports = {
    name: "emoji",
    aliases: ['em'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        if (!args[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите эмодзи!**`}]});
       let emoji = args[0];
        let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setTitle(`Увеличенная версия ${emoji}`)
    .setColor(guild.emb)
    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send({embeds:[embed]});
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        let ee = new MessageEmbed()
        .setDescription("Неизвестное эмодзи!")
        .setColor(guild.emb)
        if (!parsed[0]) return message.channel.send({embeds:[ee]});
        embed.setImage(parsed[0].url);
        return message.channel.send({embeds:[embed]}).catch(() => {});
    }
        
    }
};
