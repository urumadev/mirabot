const { MessageEmbed } = require("discord.js");
const Discord = module.require("discord.js");

const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "send",
    aliases: ['сейэмбед'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const targetChannel = message.mentions.channels.first()
            if (!targetChannel) return message.reply('укажите сначала канал!');
            args.shift()
              const json = JSON.parse(args.join(' '))
              const { text = '' } = json;
              targetChannel.send({content:text,
                embeds: [json]
              })
            } catch (error) {
                let emb = new MessageEmbed()
                .setTitle("Ошибка")
                .setDescription(`Составьте **правильный** текст на [конструкторе](https://mirabot-ds.herokuapp.com/embed.html)!`)
                .setColor("#bd0926")
                .setTimestamp()
                .setFooter({text:message.author.username})
               return message.channel.send({embdeds:[emb]})
          
            }
            message.delete()

    }
};
