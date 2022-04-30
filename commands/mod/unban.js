const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "unban",
    aliases: ['unban'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
        const embc = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
    let userID = args[0];
    if (!userID) return message.reply({content:"укажите id пользователя!"});
    if (isNaN(args[0])) return message.reply({content:'Вам необходимо указать действительное id человека, которого хотите разбанить!'});
    message.guild.fetch.bans().then(async bans => {
        if (bans.size == 0) return message.reply('на этом сервере нет банов!');
        let bUser = bans.find(b => b.user.id == userID)
        if (!bUser) return message.reply({content:'данный пользователь не в бане!'});
        await message.guild.members.unban(bUser.user).catch(() => {});
        let emb = new MessageEmbed()
        .setDescription(`${message.author} возвраращет из бана пользователя ${args[0]}`)
        .setColor(embc.emb)
        message.channel.send({embeds:[emb]}).catch(() => {});
    })
}
};
