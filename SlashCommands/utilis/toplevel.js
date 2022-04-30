const { Client, CommandInteraction } = require("discord.js");
const { stripIndents } = require('common-tags');
const User = require("../../user.js");
const Guild = require("../../guild.js");
const strftime = require('strftime')
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "toplevel",
    description: "топ по уровням",
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
        let users = await User.find({guild:interaction.guild.id,level:{$ne:null}}).sort({ level: -1 }).limit(5)
        let text = '';
        let userss = await User.findOne({ userID: interaction.user.id ,guild:interaction.guild.id}) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
        let n = 0;
        for (const user of users) {
            n++;
           
            let u = interaction.guild.members.cache.get(user.userID);
            if (!u) {
await User.deleteOne({userID:user.userID,guild:interaction.guild.id})
break;
}
            let a = u.user.username || "пусто";

            text += `**#${n}. ${a}**\n${user.level} уровень | ${user.msg}xp\n\n`;
        };
    
        let top = await User.find({ level: { $gte: userss.level }}).countDocuments();
        if (!top) top = "неопределено"
        if (text == " ") text = "Никого нет"
        let embed = new MessageEmbed()
        embed.setTitle(`Топ по подвигам`)
        .setColor("RANDOM")
       .setFooter(`Ваша позиция - ${top}`)
        .setDescription(text)
   
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
            let us =  await User.find({ guild:interaction.guild.id,level: { $ne: null } }).sort({ level: -1 }).limit(5).skip(page * 5)
            let txt = ' ';
            for (const user of us) {
                n++;
                if (!user) break;
                let u = interaction.guild.members.cache.get(user.userID);
                if (!u) {await User.deleteOne({userID:user.userID,guild:interaction.guild.id})
            break
            }
                txt +=`**#${n}. ${u.user.tag}**\n${user.level} уровень | ${user.msg}xp\n\n`;
            }
            if (txt == " ") txt = "Никого нет"
                embed.setTitle(`Топ по уровням`)
                embed.setDescription(stripIndents`${txt}`);
                embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                embed.setTimestamp()
                embed.setColor("RANDOM")
        
                embed.setFooter(`Страница: ${page}`);
                msg.edit({ embeds: [embed] }).catch(() => { });
                r.users.remove(interaction.user.id).catch(() => { });
            
        })
    
    
    },
};