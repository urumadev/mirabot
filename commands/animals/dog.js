
const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "dog",
    aliases: ['собака'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
     let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
     require('axios')('https://dog.ceo/api/breeds/image/random').then(async (a) => {
        let emb = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${message.author.username}, Вот ваша собака**`)
        .setImage(a.data.message)
        .setFooter({text:`${message.guild.name}`,iconURL:message.author.avatarURL({dynamic:true})})
        message.channel.send({ embeds: [emb] })
    })  
    },
};
