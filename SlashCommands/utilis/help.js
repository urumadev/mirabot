const User = require('../../user.js');
const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed, MessageSelectMenu} = require("discord.js");
const Guild= require('../../guild.js');
const { stripIndents } = require('common-tags');
module.exports = {
    name: "help",
    description: "меню помощи",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        await interaction.deferReply({ephemeral:true}).catch(() => {});
        //await interaction.deferReply({ephemeral:true}).catch(() => {});
        let guild = await Guild.findOne({id:interaction.guild.id}) || Guild({id:interaction.guild.id});
        const button = new MessageButton()
        .setLabel('Пригласить бота')
        .setStyle("LINK")
        .setURL("https://discord.com/oauth2/authorize?client_id=736853019282636851&scope=bot+applications.commands&permissions=2097147135")
        const buttons = new MessageActionRow()
        .addComponents(button)
        let emb = new MessageEmbed()
        .setTitle(`**Mira bot - многофункциональный дискорд бот**`)
      
        .setTimestamp()
        .setDescription( stripIndents 
        `**Префикс бота:** \`${guild.prefix}\`
        **Просмотр премиум команд** - \`/premium\`
        **Ссылка на добавление** - [Нажать](https://discord.com/oauth2/authorize?client_id=736853019282636851&scope=bot+applications.commands&permissions=2097147135) 
        **В связи с последними событиями в мире, на всех серверах действует бесплатный премиум (Если хотите поддержать проект, то в выпадающем меню выберите соотвествующую категорию)**

        [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("help")
           
            .setPlaceholder(`Выбери необходимую категорию!`)
            .addOptions([
                {
                    label: "Настройки сервера",
                    value:"1",
                    description:"Гибкая настройка бота для сервера",
                    emoji:"<a:BOLTsettings:940650563295662082>",
                },
                {
                    label: "Настройка модулей для сервера",
                    value:"2",
                    description:"Можно включить / отключить модули",
                    emoji:"<a:pollstats:940565353518485507>",
                },
                {
                    label: "Настройка входа - выхода",
                    value:"3",
                    description:"Тут можно настроить сообщения о входе / выходе",
                    emoji:"👋",
                },
                {
                    label: "Модерация сервера",
                    value:"4",
                    description:"Показывает список команд для модерации",
                    emoji:"<:emoji_89:940563474575151164>",
                },
                {
                    label: "Статистика",
                    value:"5",
                    description:"Информация о командах статистики",
                    emoji:"<:emoji_90:940563493881528340>",
                },
                {
                    label: "Roleplay",
                    value:"6",
                    description:"Покажите людям свои эмоции",
                    emoji:"<:RolePlay1:940566926420226078>",
                },
                {
                    label:"Второстепенное",
                    value:"7",
                    description:"Команды, которые поднимут Вам настроение",
                    emoji:"<:SlashCommands:940619881102057503>"
                },
            ])
            
        )
        interaction.followUp({embeds:[emb],components:[row,buttons]})
    }
        }
