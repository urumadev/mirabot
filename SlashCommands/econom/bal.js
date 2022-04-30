
const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "bal",
    description: "посмотреть баланс пользователя",
    type: 'CHAT_INPUT',
    options: [
      
        {
            name: "member",
            description: "пользователь",
            type: 6,
            required:false,
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
     if (!guild.val) return interaction.followUp({content:"на сервере не включена экономика!"})
     let m = interaction.options.getUser("member");
    member = interaction.guild.members.cache.get(interaction.user.id);
     if (m) member = interaction.guild.members.cache.get(m.id);
     let user = await User.findOne({userID:member.id, guild:member.guild.id}) || new User({userID:member.id, guild:member.guild.id})
    member = member.user;
     let embed = new MessageEmbed()
     .setTitle(`Баланс пользователя ${member.username}`)
     .setDescription(`**У Вас на счету: ${user.withmoney} ${guild.val} **`)
     .setColor(guild.emb)
     .setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
     interaction.followUp({embeds:[embed],ephemeral: false});

    },
};
