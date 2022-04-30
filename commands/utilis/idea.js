const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const { stripIndents } = require('common-tags');
module.exports = {
    name: "idea",
    aliases: ['идея'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        if (!args[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите текст!**`}]});
        const text = args.join(' ');
        let channel = message.guild.channels.cache.get(guild.idea);
        if (!channel) return  message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, на сервере нет канала!**`}]});
        if (text.length > 1500) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите текст меньше 1500 символов!**`}]});
        if (text.length < 15) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите текст больше 15 символов!**`}]});
        let emb = new MessageEmbed()
        .setAuthor({name:message.member.displayName, iconURL:message.author.avatarURL({ dynamic: true })})
        .setTitle('**Идея <:GalaxyIdea:941542767765635113>**')
        .setDescription( stripIndents `${text}`)
        .setColor(guild.emb)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        
        
    if (channel)    channel.send({embeds:[emb]}).then(async(msg) => {
    
            setTimeout(() => { msg.react('<a:CheckMark:941406154314100776>')}, 1000)
            setTimeout(() => { msg.react('<a:cross:941406144679800883>')}, 2000)
        
      
        });
        message.channel.send({embeds: [{description: `**${message.author}, Ваша идея была успешно отправлена!**`}]});
    
    }
};
