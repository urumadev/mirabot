const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const { stripIndents } = require('common-tags');

client.on('messageDelete', async (message) => {
	if (!message.guild) return;
	let g = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });

	 message.guild.chan = message.guild.channels.cache.get(g.logs);
	 if (g.lgc != null && g.lgc.includes(message.channel.id)) return;
	if (!message.guild.chan) return;
	if (!message.guild) return;
	if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return;
	if (!message.content && !message.attachments.first()) return;
	if (message.author == client.user) return;
	
	if(message.attachments.first()) {
	const embed = new MessageEmbed()
		.setTitle('Сообщение удалено')
		.setColor('#9211cb')
		.setDescription( stripIndents `**Сообщение**\n${message.content || 'пусто'}`)
		.setImage(`${message.attachments.first().proxyURL}`)
		.addField('Канал', `${message.channel}`)
		.setFooter({text:`${message.author.tag}`,urL: message.author.avatarURL({ dynamic: true })});

		return message.guild.chan.send({embeds:[embed]}).catch(() => { });
	};

		const embed = new MessageEmbed()
			.setTitle('Сообщение удалено')
			.setColor('#9211cb')
			.setDescription(stripIndents `**Сообщение**\n${message.content || 'пусто'}`)
		
			.addField('Канал', `${message.channel}`)
			.setFooter({text:`${message.author.tag}`, iconURL:message.author.avatarURL({ dynamic: true })});
	
			return message.guild.chan.send({embeds:[embed]}).catch(() => { });
		
});