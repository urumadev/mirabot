
const User = require('../../user.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "pay",
    description: "перевести денег пользователю",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "пользователь",
            type: 6,
            required: true,
        },
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
        let m = interaction.options.getUser("user");
        let member = interaction.guild.members.cache.get(m.id)
        let num = interaction.options.getNumber("number");
        let user = await User.findOne({userID:interaction.user.id,guild:interaction.guild.id}) || new User({userID:interaction.user.id,guild:interaction.guild.id});
        let user_2 = await User.findOne({userID:m.id,guild:interaction.guild.id}) || new User({userID:m.id,guild:interaction.guild.id});
        if (user.withmoney < num) return interaction.followUp({content: "У Вас нехватка средств!",ephemeral: true});
        if (num < 1) return interaction.followUp({content: "Укажите \`корректное\` число!",ephemeral: true});
        user.withmoney-=num;
        user_2.withmoney+=num;
        user_2.save()
        user.save()
        let emb = new MessageEmbed()
        .setDescription(`**<@${interaction.user.id}> Вы успешно перевели \`${num}\` ${guild.val} пользователю <@${member.id}>!**`)
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL({dynamic:true}))
        interaction.followUp({embeds:[emb]})
    }
};

