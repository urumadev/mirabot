const Discord = require('discord.js');
const User = require('../user.js');
const Guild = require('../guild.js');
const {WebhookClient} = require('discord.js');
const client = require("../index");
const Marry = require('../marry.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
client.on("ready", async () => {
  client.user.setPresence({ activities: [{ name: 'activity' }], status: 'dnd' });
  await User.updateMany(
    {$set: {kd1:null},
  }).catch(() =>{});
  client.user.setActivity('за ' + client.users.cache.size + " " + "пользователями!", { type: 'WATCHING' });
    console.log(`${client.user.tag} бот запущен!`)
    
setInterval(async () => {
  const users = await User.find({ muted: true, guild: { $ne: null }});
  users.forEach(async g => {
    let guild = client.guilds.cache.get(g.guild)
    if (!guild) return;
    let name = guild.name;
    const guilds = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id });
    let role = guild.roles.cache.find(r => r.id == guilds.mt);
    if (!role) return;
    let now = new Date()
    now.getTime()
    let time = g.unmute.getTime()
    if (time <= now) {
      let user = await User.findOne({ userID: g.userID, guild: g.guild})
      user.muted = false;
      await user.save()
      let member = guild.members.cache.get(g.userID);
      if (!member) return;
      if (!member.guild.me.permissions.has("MANAGE_ROLES")) return;
      member.roles.remove(role.id).catch(() => { });
      // g.reason = 'не в муте';
      // g.muteinfo = null;
      let channel = guild.channels.cache.find(x => x.id == g.channel);
      let embs = new MessageEmbed()
      .setDescription(`Вы были размьючены на сервере **${name}** !`)
      .setColor(guilds.emb)
      if (member) member.send({embeds:[embs]}).catch(() => { });
      let emb = new MessageEmbed()
      .setDescription(`**${member.user.tag}** был размучен!`)
      .setColor(guilds.emb)
      if (!channel) return;
      if (guilds.ms == 'on') channel.send({embeds:[emb]}).catch(() => { });
    }
  })
}, 60000);
setInterval(async () => {
  const users = await Marry.find({ bol: true, guild: { $ne: null }});
  users.forEach(async g => {
    let guild = client.guilds.cache.get(g.guild)
    if (!guild) return;
    let now = new Date()
    now.getTime()
    let time = g.date.getTime()
    if (time <= now) {
      let marry = await Marry.findOne({ guild: g.guild})
      if (guild.dop_item2 && marry.bal < sum ) {
        let ch = guild.channels.cache.get(marry.ch);
        ch.delete()
        marry.bol = false
      return  marry.save()}
        if (guild.dop_item2)  {
          marry.bal-= guild.dop_item2;
        return  marry.save()
        }
    }
  })
}, 600000);
})