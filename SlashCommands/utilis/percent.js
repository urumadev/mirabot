
const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "percent",
    description: "на сколько процентов вы...",
    type: 'CHAT_INPUT',
    options: [
      
        {
            name: "string",
            description: "вопрос",
            type: "STRING",
            required: true,
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
     let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
    let string = interaction.options.getString("string");
    if (string.length < 2 || string.length > 300) return interaction.followUp({content:"**Укажите длину текста меньше 300 символов!",ephemeral:true});
    let a  = Math.floor(Math.random() * 100 + 1)
    const embed = new MessageEmbed()
    .setDescription('Удача')
    .addField('Вопрос', `\n${string}   `)
    .addField('Ответ', `\`\`\`css\nНа ${a} %\`\`\``)
    .setColor(guild.emb)
    .setTimestamp()
    .setFooter({text:interaction.user.username, url:interaction.user.avatarURL()})
    interaction.followUp({ embeds: [embed]}).catch(() =>{});

    },
};
