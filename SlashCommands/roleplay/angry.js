const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "angry",
    description: "разозлиться",
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
      
        if (t && t.id == interaction.user.id) return interaction.followUp({content:"Не нужно указывать себя!",ephemeral:true})
        let member = "себя";
    if (t) member = interaction.guild.members.cache.get(t.id).user.username;
    
      let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
  let min = 1;
  let max = 4;
  let m = Math.floor(Math.random() * (max - min + 1)) + min;
  let img;
  switch (m) {
    case 1:
      img = "https://i.gifer.com/10dq.gif";
      break;
      case 2:
        img = "https://i.gifer.com/dYt.gif";
        break;
        case 3:
          img = 'https://i.gifer.com/22p.gif';
          break;
          case 4:
            img = 'https://i.gifer.com/1Gll.gif';
            break;
  }
  let e = new MessageEmbed()
  .setTitle("Реакция: злость")
.setDescription(`${interaction.user.username} разозлился на ${member}`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(img)
return interaction.followUp({ embeds: [e] });
    }
        }
