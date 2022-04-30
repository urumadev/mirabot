const { Client, CommandInteraction } = require("discord.js");
const { stripIndents } = require('common-tags');
const User = require("../../user.js");
const Guild = require("../../guild.js");
const strftime = require('strftime')
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "topmoney",
    description: "информация о топе по валюте",
    type: 'CHAT_INPUT',
  
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
        let page = 0;
        let users = await User.find({guild:interaction.guild.id,withmoney:{$ne:null}}).sort({ withmoney: -1 }).limit(5)
        let text = '';
        let userss = await User.findOne({ userID: interaction.user.id ,guild:interaction.guild.id}) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
        let n = 0;
        for (const user of users) {
            n++;
           
            let u = interaction.guild.members.cache.get(user.userID);
            let a = u.user.username || "пусто";
            text += `**#${n}. ${a}**\n${guild.val} - ${user.withmoney}\n\n`;
        };
    
        let top = await User.find({ withmoney: { $gte: userss.msg }}).countDocuments();
        let embed = new MessageEmbed()
        embed.setTitle(`Топ по серверной валюте`)
        .setColor("RANDOM")
        .setFooter({text:`Ваша позиция: ${top} | Страница: 1`})
        .setDescription(text)
        .setThumbnail(interaction.guild.iconURL())
        let msg = await interaction.followUp({
            embeds: [
               embed
            ]
        })
        setTimeout(() => { msg.react('▶️') }, 1000)
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === interaction.user.id;
        const forwards = msg.createReactionCollector({ filter:forwardsFilter, time: 420000 })
        forwards.on('collect',  async r => {    
            if (page === 20) return r.users.remove(interaction.user.id).catch(() => { });
            page++;
            let us =  await User.find({guild:interaction.guild.id, withmoney: { $ne: null }}).sort({ withmoney: -1 }).limit(5).skip(page * 5)
            let txt = ' ';
            for (const user of us) {
                n++;
                if (!user) break;
                let u = interaction.guild.members.cache.get(user.userID);
                let a = u.user.username || "пусто";
                text += `**#${n}. ${a}**\n${guild.val} - ${user.withmoney}\n\n`;
            }
           
                embed.setTitle(`Топ по серверной валюте`)
                embed.setDescription(stripIndents`${txt || "пусто"}`);
                embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                embed.setTimestamp()
                embed.setColor("RANDOM")
                embed.setThumbnail(interaction.guild.iconURL())
                embed.setFooter({text:`Страница: ${page}`});
                msg.edit({ embeds: [embed] }).catch(() => { });
                r.users.remove(interaction.user.id).catch(() => { });
            
        })
    
    
    },
};