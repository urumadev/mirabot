
const User = require('../../user.js');
const Guild = require('../../guild.js');
const Marry = require('../../marry.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "marrypay",
    description: "перевести денег на счет пары",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "number",
            description: "число для передачи",
            type: "NUMBER",
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
        let num = interaction.options.getNumber("number");
        let user = await User.findOne({userID:interaction.user.id,guild:interaction.guild.id}) || new User({userID:interaction.user.id,guild:interaction.guild.id});
        if (user.marry == null) return interaction.followUp({content:"У тебя нет пары! :(",ephemeral:true});
        if (user.withmoney < num) return interaction.followUp({content:"У тебя нет средств! :(",ephemeral:true});
       let marry = await Marry.findOne({guild:interaction.guild.id,users:interaction.user.id})
       marry.bal+=num;
       marry.save()
       user.withmoney-=num;
       user.save()
       let emb = new MessageEmbed()
        .setDescription(`**<@${interaction.user.id}> Вы успешно перевели \`${num}\` на счет пары!**`)
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL({dynamic:true}))
        interaction.followUp({embeds:[emb]})
    }
};

