const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "highfive",
    description: "дать пять",
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
    if (t.id == interaction.user.id) return interaction.followUp({content:"Не нужно указывать себя!",ephemeral:true})
    let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      let min = 1;
      let max = 4;
      let m = Math.floor(Math.random() * (max - min + 1)) + min;
      let img;
      switch (m) {
        case 1:
          img = "https://cdn.discordapp.com/attachments/704416087990862005/742019087747776562/877b1e230752f54a.gif";
          break;
        case 2:
          img = "https://i.gifer.com/H2MQ.gif";
          break;
          case 3:
            img = 'https://cdn.discordapp.com/attachments/723398849900576809/768106314463182878/1EQX.gif';
            break;
            case 4:
              img = 'https://cdn.discordapp.com/attachments/723398849900576809/767800711882080266/KO7M.gif';
              break;
    
      }

  let e = new MessageEmbed()
  .setTitle("Реакция: дать пять")
.setDescription(`${interaction.user.username} дал пять ${member.user.username}`)
.setColor(guild.emb)
.setFooter({text:interaction.user.username,iconURL:interaction.user.avatarURL({dynamic:true})})
.setImage(img)
return interaction.followUp({ embeds: [e] });
    }
        }
