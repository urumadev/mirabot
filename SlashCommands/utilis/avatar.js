const User = require('../../user.js');
const { MessageEmbed, InteractionWebhook } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "avatar",
    description: "посмотреть аватарку пользователя",
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
        let m = interaction.options.getUser("member");
        let member = interaction.guild.members.cache.get(interaction.user.id);
    if (m) member = interaction.guild.members.cache.get(m.id);
       let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
  let e = new MessageEmbed()
  .setTitle(`Аватар пользователя ${member.user.username}`)
.setColor(guild.emb)
.setImage(member.avatarURL({ format: 'png', dynamic: true, size: 1024 } ))
return interaction.followUp({ embeds: [e] });
    }
        }
