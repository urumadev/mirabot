const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const figlet = require('figlet');
module.exports = {
    name: "ascii",
    aliases: ['ascii'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        if(!args[0]) return message.reply('укажите текст').catch(() => {});

        msg = args.join(" ");
    if (msg.length > 12) return message.reply('укажите текст меньше, чем 12 символов!');
        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            };
            const emb = new MessageEmbed()
            .addField('**Ваш текст**','```' + data + '```')
            .setColor('#9211cb')
            .setTimestamp()
            .setFooter({text:message.author.username, iconURL:message.author.avatarURL});
            message.channel.send({embeds:[emb]}).catch(() => {});
        })
    }
};
