const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "facepawn",
    description: "заплакать",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      let min = 1;
  let max = 8;
  let m = Math.floor(Math.random() * (max - min + 1)) + min;
  let img;
  switch (m) {
    case 1:
      img = "https://i.gifer.com/OJi.gif";
      break;
    case 2:
      img = "https://i.gifer.com/2dIw.gif";
      break;
      case 3:
        img = 'https://i.gifer.com/13Qj.gif';
        break;
        case 4:
          img = 'https://tenor.com/view/disappointed-face-palm-seriously-exasperated-gif-7304550';
          break;
          case 5:
            img = "https://i.gifer.com/2Yyd.gif";
            break;
          case 6:
            img = "https://i.gifer.com/2Ub5.gif";
            break;
            case 7:
              img = 'https://i.gifer.com/13Qg.gif';
              break;
              case 8:
                img = 'https://i.gifer.com/UQ5.gif';
                break;
  }
    
  let e = new MessageEmbed()
  .setTitle("Реакция: рука-лицо")
.setDescription(`${interaction.user.username} разочаровался`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(img)
return interaction.followUp({ embeds: [e] });
    }
        }
