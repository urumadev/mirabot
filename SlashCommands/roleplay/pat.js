const User = require('../../user.js');
const superagent = require("superagent")
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "pat",
    description: "погладить",
    type: 'CHAT_INPUT',
    options: [
      
        {
            name: "member",
            description: "пользователь",
            type: 6,
            required: false,
        },
       
    ],
    run: async (client, interaction) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        let t = interaction.options.getUser("member");
     let member
     if (t) member = interaction.guild.members.cache.get(t.id);
     if (!t) member = interaction.guild.members.cache.get(interaction.user.id);
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      const { body } = await superagent.get("https://nekos.life/api/v2/img/pat");
        let a = member.user.username;
        if (a == interaction.user.username) a = "себя";
      let e = new MessageEmbed()
  .setTitle("Реакция: погладить")
.setDescription(`${interaction.user.username} погладил **${a}**`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(body.url)
return interaction.followUp({ embeds: [e] });
    }
        }
