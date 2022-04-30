const { Client, CommandInteraction } = require("discord.js");
const strftime = require('strftime')
const { stripIndents } = require('common-tags');
module.exports = {
    name: "serverinfo",
    description: "информация о сервере",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
    let guild = client.guilds.cache.get(interaction.guild.id);
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const regions = {
            brazil: 'Brazil 🇧🇷',
            europe: 'Europe 🇪🇺',
            hongkong: 'Hong Kong 🇭🇰',
            india: 'India 🇮🇳',
            japan: 'Japan 🇯🇵',
            russia: 'Russia 🇷🇺',
            singapore: 'Singapore 🇸🇬',
            southafrica: 'South Africa 🇿🇦',
            sydeny: 'Sydeny 🇦🇺',
        };
          const verificationLevels = {
            NONE: 'Нет',
            LOW: 'Низкий',
            MEDIUM: 'Средний',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        let ow = interaction.guild.members.cache.get(guild.ownerId)
        let online = interaction.guild.members.cache.filter(m => (m.presence && m.presence.status == "online")).size;
        let idle =interaction.guild.members.cache.filter(m => (m.presence && m.presence.status == "idle")).size;
        let dnd = interaction.guild.members.cache.filter(m => (m.presence && m.presence.status == "dnd")).size;
        let offline = interaction.guild.memberCount -  online;
        interaction.followUp({

            embeds: [
                {
                    title: `**Информация о сервере ${guild.name}**`,
                    description: stripIndents `Дата создания🕞: **${strftime('%d.%m.%Y в %H:%M', new Date(guild.createdTimestamp))}**
                    Создатель: **${ow.user.username}**
                    Кол-во участников👥: **${guild.memberCount}**
                    Уровень защиты: **${verificationLevels[guild.verificationLevel]}**
                    Кол-во эмодзи: **${guild.emojis.cache.size}**
                    Ролей: **${roles.length}**
                    Бустеров сервера: **${guild.premiumSubscriptionCount || '0'} <a:niro2:767734028912164866>**
                    Кол-во людей в голосовом канале: ** ${guild.members.cache.filter(member => member.voice.channel).size}**
                    AFK канал:** ${guild.afkChannel || "Нет"}**
                    
                    \`\`\`Статусы\`\`\`
                    <:onl:807613731625893888> В сети: **${online || "неизвестно"}**
                    <:onl2:807613747950518303> Неактивны: **${idle || "нет"} **
                    <:onl3:807613769219964949> Не беспокоить: **${dnd || "нет"}**
                    <:onl4:807613789708484639> Не в сети ** ${offline || "неизвестно"}**`,
                    color: "#876C99",
                    footer: {
                        text: `Запрошено: ${interaction.user.username}`,
                    },
                    thumbnail: {
                        url: guild.iconURL({dynamic: true}),
                    },
                   
                    timestamp: new Date(),
                },
            ],
        });
    // })
    },
};
