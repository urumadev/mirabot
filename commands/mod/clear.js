const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const ms = require('ms');
module.exports = {
    name: "clear",
    aliases: ['clear'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        if (!args[0] || (args[0] && isNaN(args[0]) == true)) return message.channel.send({embeds: [{color: "RED", title:"Ошибка ❌",description: `**${message.author}, укажите кол-во сообщений!**`}]});
        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true).catch(() => {});

        const embed = new MessageEmbed()
        .setColor(guild.emb)
            .setDescription(`Удалено сообщений ${deleteAmount}`)
            .setFooter({text:message.author.username,iconURL: message.author.avatarURL()})
        await message.channel.send({embeds:[embed]}).then(message => setTimeout(() => {
            message.delete()
        }), 3000).catch(() => {});
    }
}