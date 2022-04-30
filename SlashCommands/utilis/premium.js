const User = require('../../user.js');
const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed, MessageSelectMenu} = require("discord.js");
const Guild= require('../../guild.js');
const { stripIndents } = require('common-tags');
module.exports = {
    name: "premium",
    description: "меню помощи для премиума",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        await interaction.deferReply({ephemeral:true}).catch(() => {});
        //await interaction.deferReply({ephemeral:true}).catch(() => {});
        let guild = await Guild.findOne({id:interaction.guild.id}) || Guild({id:interaction.guild.id});
        let emb = new MessageEmbed()
        .setTitle(`**Mira bot - многофункциональный дискорд бот**`)
     
        .setTimestamp()
        .setDescription( stripIndents 
        `**Префикс бота:** \`${guild.prefix}\`
        **Просмотр обычных команд** - \`/help\`
        **В связи с последними событиями в мире, на всех серверах действует бесплатный премиум (Если хотите поддержать проект, то в выпадающем меню выберите соотвествующую категорию)**

        [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("premium")
            .setPlaceholder(`Выбери необходимую категорию!`)
            .addOptions([
                {
                    label: "Уровни",
                    value:"pr_1",
                    description:"Настройка уровней",
                    emoji:"<:LevelsRanks:940634099511595038>",
                },
                {
                    label: "Экономика для администрации",
                    value:"pr_2",
                    description:"Настроим себе деньжат",
                    emoji:"<a:economy:940649884007145512>",
                },
                {
                    label: "Экономика для обычных пользователей",
                    value:"pr_3",
                    description:"Ухх, деньжата...",
                    emoji:"<:xenos_money:940634381322694716>",
                },
                {
                    label: "Музыка",
                    value:"pr_4",
                    description:"Нет лучше лекарства для души",
                    emoji:"<a:HP_aMusicalNotes:940634575707729930>",
                },
                {
                    label: "Доп. настройка",
                    value:"pr_5",
                    description:"Тут ничего особо нет, но все же...",
                    emoji:"<a:settings:940650778836758588>",
                },
                {
                    label:"Донат",
                    value:"9",
                    description:"Поддержите проект небольшой денюжкой",
                    emoji:"<:donator:947406766604431410>"
                }
            ])
            
        )
        interaction.followUp({embeds:[emb],components:[row]})
    }
        }
