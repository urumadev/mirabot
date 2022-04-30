const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");

module.exports = {
    name: "age",
    aliases: ['age'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        let user = await User.findOne({userID:message.author.id, guild:message.guild.id}) || new User({userID:message.author.id, guild:message.guild.id});
        if (!args[0] || (args[0] && isNaN(args[0]) == true)) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите верное число!**`}]});
        if (user.age == args[0]) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, этим ты ничего не изменишь!**`}]});
        user.age = args[0];
        user.save();
        return  message.channel.send({embeds: [{color: "GREEN", title:"Успешно ✅",description: `**${message.author}, Вы успешно установили возраст!**`}]});
        
    }
};
