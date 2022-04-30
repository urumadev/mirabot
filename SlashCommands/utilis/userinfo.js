const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../guild.js');
let strftime = require("strftime")
const { MessageEmbed, InteractionWebhook } = require("discord.js");
const { stripIndents } = require('common-tags');
module.exports = {
    name: "userinfo",
    description: "посмотреть профиль пользователя",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "пользователь",
            type: 6,
            required: false,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
        
        let m = interaction.options.getUser("user");
        let a;
        if (m == null) a = 1;
        let user = interaction.guild.members.cache.get(interaction.user.id)
         if (m) user = interaction.guild.members.cache.get(m.id) 
       const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
         let status;
         switch (user.presence.status) {
         case 'online':
             status = '🟢 В сети';
             break;
         case 'dnd':
             status = '🔴 Не беспокоить';
             break;
         case 'idle':
             status = '🌙 Неактивен';
             break;
         case 'offline':
             status = '<:onl4:807613789708484639> Не в сети';
             break;
         default:
             status = '❌ Неизвестен';
         }
       let flagss = user.user.flags, markss = ''
       if(flagss.has('EARLY_VERIFIED_BOT_DEVELOPER')) markss += `<a:vfdev:762273409773207582>`
       if(flagss.has('HOUSE_BRILLIANCE')) markss += `<:bril:762272675506683914> `
       if(flagss.has('HOUSE_BRAVERY')) markss += `<:br:762272645013831690>`
       if(flagss.has('HOUSE_BALANCE')) markss += `<:balance:762272692430045214> `
       if(flagss.has('BUGHUNTER_LEVEL_1')) markss += `<:bug:762272662205759499>  `
       if(flagss.has('PARTNERED_SERVER_OWNER')) markss += `<:pathner:762272713263153162> `
       if(flagss.has('EARLY_SUPPORTER')) markss += `<:early:767729925582618665>`
       if(flagss.has('DISCORD_CERTIFIED_MODERATOR')) markss += `<:emoji_89:940563474575151164>`
       if(flagss.has('VERIFIED_BOT')) markss += `<:DiscordVerifiedBot:947200532781600863>`
       if(flagss.has('HYPESQUAD_EVENTS')) markss += `<:hype_squad_badge:947201047665995847>`
       let day = 1000 * 60 * 60 * 24;
       let date1 = new Date(interaction.createdTimestamp);
       let date2 = new Date(user.user.createdAt);
       let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day)); //new Date(user.user.createdAt))} (${diff1} дней назад)
       let dayy = 1000 * 60 * 60 * 24
       let date11 = new Date(interaction.createdTimestamp)
       let date22 = new Date(user.joinedAt)
       let diff11 = Math.round(Math.abs((date11.getTime() - date22.getTime()) / dayy))
     
       const devices = {
         desktop: 'Компьютер',
         web: 'Браузер',
         mobile: 'Телефон'
         };
         let pr = "";
         for (let device in user.presence.clientStatus) {
         pr += `${devices[device]}`
         };
         if (pr.length > 9) pr = 'На нескольких устройствах';
         let st = user.presence.activities[0];
         if (st) st = st.state;
         if (!st) st = "нет"
         let emb = new MessageEmbed()
         .setThumbnail(user.user.avatarURL({ dynamic: true }))
         .setDescription(stripIndents `[Аватар](${user.user.avatarURL({ dynamic: true })})\n\n**Статус пользователя - **${st || "Нет"}\n**Дата создания аккаунта** - ${strftime('%d.%m.%Y в %H:%M', new Date(user.user.createdAt))} (${diff1} дней назад) \n**Дата присоединения** - ${strftime('%d.%m.%Y в %H:%M', new Date(user.joinedAt))} (${diff11} дней назад)`)
         .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
         .setTitle("**Информация о пользователе**")
         .addField("> Имя",`**\`\`\`${user.user.tag}\`\`\`**`,true)
         .addField(`> ID`,`\`\`\`${user.id}\`\`\``,false)
         .addField(`> Статус `,`\`\`\`${status}\`\`\``,true)
         .addField('> Значки',`${markss || 'Нет'}`,true)
          .addField('> Девайс', `\`\`\`${pr || 'Не определен'}\`\`\``,true)
          .addField(`> Роли [${roles.length - 1 || "Нет"}]`,`\n${user.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `${roles}`).slice(0,20).join(" | ")|| "Нет"}`,false)
          .setFooter({text:`Запросил: ${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
           return interaction.followUp({embeds:[emb]});     
        //  let embed = new MessageEmbed()
        //  .setThumbnail(user.user.avatarURL({ dynamic: true }))
        //  embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
        //  embed.setTitle('Информация о пользователе')
        //  embed.setDescription(stripIndents `[Аватар](${user.user.avatarURL({ dynamic: true })})
        //  **Имя:** ${argsUser.tag}
        //  **Дата присоединения к серверу:** ${strftime('%d.%m.%Y в %H:%M', new Date(user.joinedAt))} (${diff11} дней назад)
        //  **Дата создания аккаунта:** ${strftime('%d.%m.%Y в %H:%M', new Date(user.user.createdAt))} (${diff1} дней назад)
        //  **Девайс:** ${pr}`)
        //    .addField('**ID пользователя:** ',`${user.id}`,true)
        //    .addField('**Роли🎭**',`Кол-во ролей [${roles.length - 1}] ${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).slice(0,20).join("|")|| "Нет"}`,true)
        //    .addField('**Значки**',markss || 'Нет',true)
        //    .setFooter({text:`Запросил: ${interaction.user.id}`,iconURL:interaction.user.avatarURL({dynamic:true})})
        //    return interaction.followUp({embeds:[embed]});     
    }
};

