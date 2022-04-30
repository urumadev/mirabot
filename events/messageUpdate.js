const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const { stripIndents } = require('common-tags');
client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (!oldMessage.guild) return;
	let g = await Guild.findOne({ id: newMessage.guild.id }) || new Guild({ id: newMessage.guild.id });
	if (!g) return;
	if (g.lgc != null && g.lgc.includes(oldMessage.channel.id)) return;
	newMessage.guild.msgudate = oldMessage.guild.channels.cache.get(g.logs);
	if (!newMessage.guild.msgudate) return;
	if (oldMessage.content.length <= 1 || newMessage.content.length <= 1 || !newMessage.member) return;
	if (oldMessage.content.length > 1020 || newMessage.content.length > 1020 || !newMessage.member) return;
	if (!oldMessage.guild.me.permissions.has("MANAGE_MESSAGES")) return;

	const embedz = new MessageEmbed()
		.setTitle('Сообщение было отредактированно')
		.setColor('#9211cb')
		.setDescription( stripIndents `**Старое сообщение**\n${oldMessage.content}\n\n**Новое сообщение**\n${newMessage.content}`)
		.addField('Канал', `${newMessage.channel.name}`)
		.setFooter({text:newMessage.member.displayName, iconURL:newMessage.author.avatarURL({ dynamic: true })});
		newMessage.guild.msgudate.send({embeds:[embedz]}).catch(() => { });
});