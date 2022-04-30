const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
const superagent = require("superagent")
module.exports = {
    name: "bite",
    description: "пригрозить",
    type: 'CHAT_INPUT',
    options: [
      
        {
            name: "member",
            description: "пользователь",
            type: 6,
            required: true,
        },
       
    ],
    run: async (client, interaction) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
        let t = interaction.options.getUser("member");
     let member
     if (t) member = interaction.guild.members.cache.get(t.id);
    if (t.id == interaction.user.id) return interaction.followUp({content:"Не нужно указывать себя!",ephemeral:true})
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});

  let min = 1;
  let max = 4;
  let m = Math.floor(Math.random() * (max - min + 1)) + min;
  let img;
  switch (m) {
    case 1:
      img = "https://cdn.discordapp.com/attachments/704416087990862005/742029075782041692/795ab3bd5cc62360.gif";
      break;
    case 2:
      img = "https://cdn.discordapp.com/attachments/704416087990862005/742019999027298385/3b8c409a4dc46fde.gif";
      break;
      case 3:
        img = 'https://i.gifer.com/lfX.gif';
        break;
        case 4:
          img = 'https://i.gifer.com/3eaf.gif';
          break;
  }
  let e = new MessageEmbed()
  .setTitle("Реакция: пригрозить")
.setDescription(`${interaction.user.username} пригрозил ${member.user.username}`)
.setColor(guild.emb)
.setImage(img)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
return interaction.followUp({ embeds: [e] });
    }
        }
