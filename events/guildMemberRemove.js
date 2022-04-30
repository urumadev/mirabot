const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const Cooldownsss = new Map();
const Cooldownnn = 800000;
client.on('guildMemberRemove', async member => {

	if (!member.guild) return;

	let g = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });
	if (!g) return;
	const Cooldowns = new Map();
	var Cooldown = 1500;
	 var down = Cooldowns.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldown > Date.now()) return;
	Cooldowns.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	let channel = member.guild.channels.cache.get(g.leave);
	if (!channel) return; //member.guild.owner.send('укажите канал для сообщений о выходе пользователя!').catch(() => { });
	if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;

	if (g.leave == null || !g.leave) return;
let string = g.lv || `С сервера вышел пользователь **${member.user.tag}**`;
	let str = string.replace(/{member}/gm, member.user.tag);
	str = str.replace(/{membersCount}/gm, member.guild.memberCount);
	//member.guild.owner.user.tag

	if (str == 'нет') str = `С сервера вышел новый пользователь ${member.user.tag}`;
	if (g.lemb != null && g.lemb == 'off') {
		return channel.send(str);
	};
	const color = g.color;
	if (color == null) color = '#000000';
	const image = g.lvimage
	if (g.lft == null) g.lft = '';
	if (g.lt == null) g.lt = '';
	g.save();
	let embs = new MessageEmbed()
	.setTitle(g.lt)
	.setDescription(`${str}`)
	.setColor(color)
	.setImage(image)
	.setFooter({text:g.lft})
	channel.send({embeds:[embs]}).catch(() => { });
});
client.on("guildMemberRemove", async member =>  {
    let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.members) return;
    let channel = member.guild.channels.cache.get(g.members);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;

	 var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldownnn > Date.now()) return;
	Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
	const name = `Участники:  ${channel.guild.memberCount}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
client.on("guildMemberRemove", async member =>  {
	let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.online) return;

    let channel = member.guild.channels.cache.get(g.online);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;

	 var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	  if (down.time + Cooldownnn > Date.now()) return;
	Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Онлайн:  ${ channel.guild.members.cache.filter(m => (m.presence && (m.presence.status == "online" || m.presence.status == "dnd" || m.presence.status == "idle"))).size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});

client.on("guildMemberRemove", async member =>  {
	let g =  await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id });

    if(!g.offline) return;
    let channel = member.guild.channels.cache.get(g.offline);
	if(!channel || !member.guild.me.permissions.has("ADMINISTRATOR")) return;

	var down = Cooldownsss.get(member.guild.id) || { time: 0 };
	if (down.time + Cooldownnn > Date.now()) return;
  Cooldownsss.set(member.guild.id , { id: member.guild.id, time: Date.now() });
    const name = `Оффлайн: ${channel.guild.memberCount - channel.guild.members.cache.filter(m => (m.presence && (m.presence.status == "online" || m.presence.status == "dnd" || m.presence.status == "idle"))).size}`;
    if(channel.name != name) channel.setName(name).catch(() => { });
});
