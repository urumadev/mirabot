const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "digger",
    description: "смущение",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      
  let min = 1;
  let max = 6;
  let m = Math.floor(Math.random() * (max - min + 1)) + min;
  let img;
  switch (m) {
    case 1:
      img = "https://i.gifer.com/fxkD.gif";
      break;
    case 2:
      img = "https://i.gifer.com/16F3.gif";
      break;
      case 3:
        img = 'https://i.gifer.com/QPr.gif';
        break;
        case 4:
          img = 'https://i.gifer.com/8E.gif';
          break;
          case 5:
            img = "https://i.gifer.com/g2mN.gif";
            break;
            case 6:
              img = 'https://i.gifer.com/2K8.gif';
              break;
      }
    
  let e = new MessageEmbed()
  .setTitle("Реакция: смущение")
.setDescription(`${interaction.user.username} засмущался`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(img)
return interaction.followUp({ embeds: [e] });
    }
        }
