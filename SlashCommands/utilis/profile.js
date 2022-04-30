const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../guild.js');
let strftime = require("strftime")
const { MessageEmbed, InteractionWebhook } = require("discord.js");
const { stripIndents } = require('common-tags');
module.exports = {
    name: "profile",
    description: "посмотреть профиль пользователя",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "пользователь",
            type: 6,
            required: false,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        let m = interaction.options.getUser("user");
        let a;
        if (m == null) a = 1;

        
        let user =   await User.findOne({ userID: interaction.user.id,guild:interaction.guild.id }) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
        if (m) user = await User.findOne({ userID: m.id,guild:interaction.guild.id }) || new User({ userID: m.id,guild:interaction.guild.id });
        let member = interaction.guild.members.cache.get(interaction.user.id)
         if (m) member = interaction.guild.members.cache.get(m.id) 
          let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
      if (m)  user = await User.findOne({userID:member.id,guild:interaction.guild.id}) || new User({userID:member.id,guild:interaction.guild.id})
     
     
      if (client.voiceMemory.get(member.id)) {
        let time = Date.now() - client.voiceMemory.get(member.id).timestamp;
        user.voice += time;
        client.voiceMemory.delete(member.id);
      }
  
      if (member.voice.channel) {
        if (member.voice.channel !== member.guild.afkChannel) {
          if (!member.voice.selfDeaf) {
            if (!member.voice.selfMute) {
              if (!member.voice.serverMute) {
                if (!member.voice.serverDeaf) {
                  client.voiceMemory.set(member.id, { timestamp: Date.now() });
                }
              }
            }
        }
    }
}
let milliseconds = user.voice;
let days = milliseconds > 86400000 ? Math.floor(milliseconds / 1000 / 60 / 60 / 24) : '';
let hours = milliseconds > 3600000 ? Math.floor(milliseconds / 1000 / 60 / 60 % 24) : '';
let minutes = milliseconds > 60000 ? Math.floor(milliseconds / 1000 / 60 % 60) : '';
let seconds = milliseconds > 1000 ? Math.floor(milliseconds / 1000 % 60 % 60) : '';

let mesg = `${days ? days + ' дней' : ''} ${hours ? hours + ' часов' : ''} ${minutes ? minutes + ' минут' : ''} ${seconds + ' секунд'} `;
if (milliseconds <= 0) {
  mesg = 'Никогда не заходил';
}

        let msg = new MessageEmbed()
        .setColor(guild.emb)
          .setTitle("Профиль")
          .setDescription(stripIndents `**Имя:** ${member.user.username} \n\n**Биография:** ${user.bio || "0"}`)
          .addField(`**Времени в войсе**`,`${mesg}`,true)
          .addField('**Возраст:**',`${user.age || "неизвестно"}`,true)
          .addField('**Репутация:**',`${user.rep || "0"}`,true)
          .setImage('https://cdn.discordapp.com/attachments/702932369069572186/774209823112822784/Profile.png')
          .setThumbnail(member.user.avatarURL({dynamic: true}))
          .setTimestamp()
          .setFooter({text:`${interaction.user.username}`,iconURL:interaction.member.avatarURL({dynamic: true})})
        interaction.followUp({embeds:[msg]}).catch(() =>{});
    }
};

