const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const Cooldownsss = new Map();
const Cooldownnn = 800000;
client.on('guildMemberAdd', async m => {
	if (!m.guild) return;
	if (!m.guild.me.permissions.has("ADMINISTRATOR")) return;
	let member = m.guild.members.cache.get(m.id);
	let g = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
	if (!g) return;
	const Cooldowns = new Map();
	var Cooldown = 1500;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	let channel = member.guild.channels.cache.get(g.welc);
	if (!channel) return;
let string = g.wl || `На сервер зашел <@${member.id}>!`;
	let str = string.replace(/{member}/gm, `${member.user.tag}`);
	str = str.replace(/{membersCount}/gm, member.guild.memberCount);
	// str = str.replace(/{owner}/gm, member.guild.owner.user.tag || "не определен");
	str = str.replace(/{guild}/gm, member.guild.name);
	str = str.replace(/{username}/gm, member.user.username);
	str = str.replace(/{id}/gm, member.id);
	str = str.replace(/{memberid}/gm, `<@${member.id}>`);
	if (str == 'нет') str = `На сервер зашел новый пользователь ${member.user.tag}`;
	if (g.wemb != null && g.wemb == 'off') {
		 channel.send(str);
	};
	if (g.wemb != "off") {
	let cl = g.wcolor;
	if (g.wft == null) g.wft = '';
	if (g.wt == null) g.wt = '';
	g.save();
	 let embs = new MessageEmbed()
	 .setTitle(g.wt)
	 .setDescription(`${str}`)
	 .setColor(cl)
	 .setImage(g.wlimage)
	 .setFooter({text:g.wft})
	 channel.send({embeds:[embs]});
	};
});
client.on("guildMemberAdd", async m => {
	if (!m.guild) return;
	if (m.user.bot == true) return;
	let member = m.guild.members.cache.get(m.id)
	let g = await Guild.findOne({ id: member.guild.id });
	if (!g) return;
	if (!g.rl) return;
	if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;
	let role = member.guild.roles.cache.find(r => r.id == g.rl);
	if (!role) return;
	member.roles.add(role.id).catch(() => { });
});
client.on("guildMemberAdd", async m => {
	if (!m) return;
    let member = m.guild.members.cache.get(m.id);
	const guilds = await Guild.findOne({ id: member.guild.id });
	if (!guilds) return;
	let user = await User.findOne({userID: member.id, guild: member.guild.id});
	if(!user || user.muted != true) return;
	if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;
	let role = member.guild.roles.cache.find(r => r.id == guilds.mt);
	if (!role) return;
	member.roles.add(role.id).catch(() => { });
});
client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.members) return;
    let channel = member.guild.channels.cache.get(g.members);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;
	const Cooldowns = new Map();
var Cooldown = 660000;
 var down = Cooldowns.get(member.guild.id) || { time: 0 };
  if (down.time + Cooldown > Date.now()) return;
Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Участники:  ${channel.guild.memberCount}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.online) return;
    let channel = member.guild.channels.cache.get(g.online);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;

	var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	if (down.time + Cooldownnn > Date.now()) return;
  Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Онлайн:  ${channel.guild.members.cache.filter(m => (m.presence && (m.presence.status == "online" || m.presence.status == "dnd" || m.presence.status == "idle"))).size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberAdd", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id });
	if (!g) return;
    if(!g.offline) return;
    let channel = member.guild.channels.cache.get(g.offline);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;
	const Cooldowns = new Map();
	var Cooldown = 660000;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Оффлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => (m.presence && (m.presence.status == "online" || m.presence.status == "dnd" || m.presence.status == "idle"))).size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});

