const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../guild.js');
const { version } = require("discord.js");
let strftime = require("strftime")
const cpuStat = require('cpu-stat');
const moment = require("moment")
const { MessageEmbed, InteractionWebhook } = require("discord.js");
const { stripIndents } = require('common-tags');
module.exports = {
    name: "botinfo",
    description: "посмотреть информацию о боте",
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
          let user = await client.users.fetch("375274737103798282");
          cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
            return console.log(err);
            }
           moment.locale('ru')
           const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
          ];
          Promise.all(promises)
          .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
         
         const duration = moment.duration(client.uptime).format(" D [дней], H [часов], m [минут], s [секунд]");
          
            
             const ihatekids = new MessageEmbed()
             
                 .setTitle("Характеристики бота")
                 .setDescription(stripIndents `Автор: \`${user.tag} (${user.id})\`🎗\n🕑Дата создания бота: **25.07.2020 (12:50:49)**\nАптайм: **${duration}**
                 Пользователей: **${totalMembers}**
                 Серверов: **${totalGuilds}**
                 Пинг: **${Date.now() - interaction.createdTimestamp } ms**
                 Шарды: **7**
                 Discord.js: **v${version}**
                Использование памяти: \`${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB\`
               Использование CPU : \`${percent.toFixed(2)} %\``)
                 
                 .setColor(guild.emb)
                 .setTimestamp()
                 .setThumbnail(client.user.avatarURL())
                 .setTimestamp()
        
                 .setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
                 interaction.followUp({embeds:[ihatekids]}).catch(() => {});
    })
  });      
}
};

