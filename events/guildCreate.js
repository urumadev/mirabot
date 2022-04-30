const { MessageEmbed } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const {WebhookClient} = require("discord.js");
client.on('guildCreate',  async (guild) => {
    if (!guild) return;
	let g = client.guilds.cache.get(guild.id);
	let ow = g.members.cache.get(g.ownerId)
	let embed5 = new MessageEmbed()
	.setTitle(`**Добавление бота на сервер***`)
	.setAuthor({name:`${guild.name}`, iconURL:guild.iconURL({ dynamic: true })})
	.setTitle(`Mirabot - многофункциональный бот для сервера дискорд!`)
	.addField(`Описание:`, 'Это многофункциональный бот, проверенный временем! Префикс бота -  \`.\` | просмотр команд - \`.help\`')
	.setDescription(`https://palerm0.ml/ - связь с разработчиком\n\n **В связи с последними событиями в мире, на всех серверах действует бесплатный премиум (Если хотите поддержать проект, то в выпадающем меню выберите соотвествующую категорию)**`)
	.setColor('GREEN')
	if (ow) ow.send({embeds:[embed5]});
	//https://discord.com/api/webhooks/821684484142792735/sTntK6i1-ZMJfkaAkIzPcl8D8q7Wdn3rs8JTWXRWPXIILYd3HOL-yVXdU3RXHwbqSt0L
	const wc = new WebhookClient({id:'821684484142792735',token:'sTntK6i1-ZMJfkaAkIzPcl8D8q7Wdn3rs8JTWXRWPXIILYd3HOL-yVXdU3RXHwbqSt0L'});
	wc.send({content:`
	\`\`\`Новый сервер\`\`\`
	**Название - ${guild.name}
	ID - ${guild.id}
	Участники - ${g.memberCount || 0}
	Owner - ${ow.user.username || "-"} (${ow.id || "хз кто"})**
	`})
	  })