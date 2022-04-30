const User = require('../../user.js');
const superagent = require("superagent")
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "wow",
    description: "удивится",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      let min = 1;
      let max = 4;
      let m = Math.floor(Math.random() * (max - min + 1)) + min;
      let img;
      switch (m) {
        case 1:
          img = "https://i.gifer.com/8mx.gif";
          break;
        case 2:
          img = "https://i.gifer.com/EkII.gif";
          break;
          case 3:
            img = 'https://i.gifer.com/LbNi.gif';
            break;
            case 4:
              img = 'https://i.gifer.com/5e4.gif';
              break;
      }
  let e = new MessageEmbed()
  .setTitle("Реакция: удивление")
.setDescription(`${interaction.user.username} удивился`)
.setColor(guild.emb)
.setImage(img)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
return interaction.followUp({ embeds: [e] });
    }
        }
