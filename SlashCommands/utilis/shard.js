const { Client, CommandInteraction } = require("discord.js");
const { stripIndents } = require('common-tags');
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "shard",
    description: "информация о шардах",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
 
    client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
        client.shard.fetchClientValues('users.cache.size').then(users => {
        client.shard.fetchClientValues('channels.cache.size').then(channels => {
        
     
        client.shard.fetchClientValues('uptime').then(uptime => {
        const embed = new MessageEmbed()
       .setTitle("**Шарды бота**")
        .setFooter({text:`${client.user.username}`,iconURL: client.user.avatarURL({dynamic: true})})
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setColor("RANDOM")
        for (let tt = 0; tt < guilds.length; tt++){
        embed.addField(`
        
        Шард #${tt} ${tt == interaction.guild.shard.id ? "[Текущий]" : " "}
        `,` Сервера: \`${guilds[tt].toLocaleString()}\`
        Пользователи: \`${users[tt].toLocaleString()}\`
        Аптайм: \`${ms(uptime[tt])}\`
        `,true)
        }
        interaction.followUp({embeds:[embed]})
        })
        })
        })
        })
        
    },
};
