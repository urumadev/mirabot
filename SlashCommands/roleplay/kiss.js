const User = require('../../user.js');
const { MessageEmbed } = require("discord.js")
const superagent = require("superagent");
const Guild= require('../../guild.js');
module.exports = {
    name: "kiss",
    description: "поцеловать",
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
      const { body } = await superagent.get("https://nekos.life/api/v2/img/kiss");
        let a = member.user.username;
        if (a == interaction.user.username) a = "себя";
      let e = new MessageEmbed()
  .setTitle("Реакция: поцеловать")
.setDescription(`${interaction.user.username} поцеловал **${a}**`)
.setColor(guild.emb)
.setImage(body.url)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
return interaction.followUp({ embeds: [e] });
    }
        }
