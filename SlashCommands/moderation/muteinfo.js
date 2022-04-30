const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
module.exports = {
    name: "muteinfo",
    description: "информация о муте пользователя",
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
     let member = interaction.guild.members.cache.get(t.id);
    if (t.id == interaction.user.id) return interaction.followUp({content:"Не нужно указывать себя!",ephemeral:true})
    let user = await User.findOne({ userID: member.id,guild:interaction.guild.id }) || new User({ userID: member.id,guild:interaction.guild.id });
    const guild = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
    const role = interaction.guild.roles.cache.find(r => r.id == guild.mt);
    if(member.roles.cache.has(role.id) &&( user.reason == null || user.reason =='не в муте' ||user.muted == false)) return interaction.followUp({content:'вы не мутили этого пользователя через бота!'})
    if (user.reason == null || user.reason =='не в муте' ||user.muted == false) return interaction.followUp({content:'данный пользователь не в муте!'})

      let emb = new MessageEmbed()
      .setTitle("Информация о муте")
      .setColor(guild.emb)
      .setDescription(`Пользователь: **${member.user.tag}**`)
      .addField(`Причина мута: `,`**${user.reason}**`,true)
      .addField('Был замучен на: ',`**${user.time}**`,true)
      .addField(`Замучен `,`**${user.muteinfo}**`,true)
      interaction.followUp({embeds:[emb]})
  
    }
        }
