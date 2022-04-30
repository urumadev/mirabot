const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "cry",
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
          img = "https://i.gifer.com/XJ1C.gif";
          break;
        case 2:
          img = "https://i.gifer.com/ji.gif";
          break;
          case 3:
            img = 'https://i.gifer.com/2NgG.gif';
            break;
            case 4:
              img = 'https://i.gifer.com/PT7a.gif';
              break;
              case 5:
                img = "https://i.gifer.com/UqjG.gif";
                break;
                case 6:
                  img = 'https://i.gifer.com/2raK.gif';
                  break;
                  case 7:
                    img = 'https://i.gifer.com/jX.gif';
                    break;
                    case 8:
                      img = 'https://cdn.discordapp.com/attachments/723398849900576809/767800712779399178/5JVW.gif';
                      break;
      }
    
  let e = new MessageEmbed()
  .setTitle("Реакция: плач")
.setDescription(`${interaction.user.username} расплакался`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(img)
return interaction.followUp({ embeds: [e] });
    }
        }
