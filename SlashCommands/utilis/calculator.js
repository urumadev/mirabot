
const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "math",
    description: "калькулятор",
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
    if (string.length < 2 || string.length > 40) return interaction.followUp({content:"**Укажите длину текста меньше 40символов!",ephemeral:true});
    if (string.includes(":")) return interaction.followUp({content:"Запрещено использовать символ ':'!",ephemeral:true})
    let resp;
    try {
        resp = math.evaluate(args.join(" "))
    } catch (e) { 
        interaction.followUp({content:"Произошла ошибка!"})};
    if (resp == Infinity) return interaction.followUp({content:"Получился слишком большой ответ!",ephemeral:true});
    const embed = new MessageEmbed()
        .setColor(guild.emb)
        .setTitle('Калькулятор')
        .setDescription(`\`\`\`css\n${resp}\`\`\``)
.setTimestamp()
.setFooter({text:interaction.user.username})
interaction.followUp({embeds:[embed]}).catch(() =>{});
    

    },
};
