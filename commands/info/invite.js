const User = require('../../user.js');
const { Message, Client, MessageActionRow, MessageButton, Interaction, MessageEmbed, MessageSelectMenu} = require("discord.js");
const Guild= require('../../guild.js');

const { stripIndents } = require('common-tags');
module.exports = {
    name: "invite",
    aliases: ['invite'],
    run: async (client, message, args) => {
        //await interaction.deferReply({ephemeral:true}).catch(() => {});
        let guild = await Guild.findOne({id:message.guild.id}) || Guild({id:message.guild.id});
        let emb = new MessageEmbed()
        .setTitle(`**Mira bot - многофункциональный дискорд бот**`)
        
        .setTimestamp()
        .setDescription( stripIndents
        `**Префикс бота:** \`${guild.prefix}\`
        **Ссылка на добавление <a:arrow_greendotright:941543630601080882>** - [Нажать](https://discord.com/oauth2/authorize?client_id=736853019282636851&scope=bot+applications.commands&permissions=2097147135) 
        
        [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
        message.channel.send({embeds:[emb]})
    }
        }
