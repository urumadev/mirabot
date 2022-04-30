const { MessageEmbed, MessageActionRow } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const Cooldownss = new Map();
const {WebhookClient} = require('discord.js');
const Cooldownn = 40000;
const Cooldowns = new Map();
var Cooldown = 3000;
client.on("messageCreate", async (message) => {
    if (!message || !message.author || !message.guild) return;
	let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
	message.guild.prefix = guild.prefix;
    if (
        message.author.bot ||
        !message.guild ||
        (!message.content.toLowerCase().startsWith(message.guild.prefix) && !message.content.toLowerCase().startsWith(client.config.prefix1)) || !message )
        return;

    let [cmd, ...args] = message.content 
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g)
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))
    if (!command) return;
    var down = Cooldowns.get(message.author.id) || { time: 0 };
		if (down.time + Cooldown > Date.now()) return;
	  Cooldowns.set(message.author.id, { id: message.author.id, time: Date.now() });
    let c = command.name;
 
    let prava;
    let a = 0;
    if (c == "slowmode" || c == "modrole" || c == "sayrole" || c == "bot" || c == "guild" || c == "welcome" || c == "leave" || c == "levels" || c == "additem" || c == "econom" || c == "addroleitem" || c == "itemdelete" || c == "setlvel" || c == "dopitem" ) prava = "ADMINISTRATOR"
    if (c == "ban" || c == "banid" || c == "unban") prava = "BAN_MEMBERS", a =1;
    if (c == "kick") prava = "KICK_MEMBERS", a = 1;
    if ( c == "clear" || c == "mute" || c == "warn" || c == "unmute" || c == "warnsremove") prava = "MANAGE_MESSAGES",a = 1;
    if (c == "survey" || c == "say" || c == "sayembed" || c == "send" ) prava = "MANAGE_MESSAGES", a = 2;
    if (c == "addrole" || c == "removerole") prava = "MANAGE_MESSAGES";
    if (c == "nick") prava = "MANAGE_NICKNAMES";
    if (guild.mod && guild.mod == "off" && ( c == "clear" || c == "mute" || c == "warn" || c == "unmute" || c == "warnsremove" || c == "ban" || c == "kick")) return;
     if (guild.say && guild.say == "off" && (c == "say" || c == "send" || c == "sayembed" || c == "survey")) return;
     if (guild.vt && guild.vt == "off" && (c == "cat" || c == "dog" || c== "weather" || c == "fortnite" || c == "emoji")) return;

    

    if ((a == 1 && !message.member.permissions.has(prava)&& guild.modrole != null && guild.modrole != [] && !message.member.roles.cache.some(r => guild.modrole.includes(r.id))) || (a == 1 && !message.member.permissions.has(prava) && !guild.modrole)) {// || (a == 1 && guild.modrole && !message.member.roles.cache.some(r => guild.modrole.includes(r.id))
        let emb = new MessageEmbed()
        .setTitle(`**Ошибка ❌**`)
        .setDescription(`**${message.author}, Вам нужны права \`${prava}\` для выполнения этой команды!**`) 
        .setTimestamp()
        return message.channel.send({embeds:[emb]});
    } 
	if ((a == 1 && !message.member.permissions.has(prava)&& guild.sayrole != null && guild.sayrole != [] && !message.member.roles.cache.some(r => guild.sayrole.includes(r.id))) || (a == 2 && !message.member.permissions.has(prava) && !guild.sayrole)) {
        let emb = new MessageEmbed()
        .setTitle(`**Ошибка ❌**`)
        .setDescription(`**${message.author}, Вам нужны права \`${prava}\` для выполнения этой команды!**`) 
        .setTimestamp()
        return message.channel.send({embeds:[emb]});
    } 
    if (prava && !message.member.permissions.has(prava) && a == 0) {
        let emb = new MessageEmbed()
        .setTitle(`**Ошибка ❌**`)
        .setDescription(`**${message.author}, Вам нужны права \`${prava}\` для выполнения этой команды!**`) 
        .setTimestamp()
        return message.channel.send({embeds:[emb]});
    }
    if (prava && !message.guild.me.permissions.has(prava)) {
        let emb = new MessageEmbed()
        .setTitle(`**Ошибка ❌**`)
        .setDescription(`**${message.author}, Мне нужны права \`${prava}\` для выполнения этой команды!**`) 
        .setTimestamp()
        return message.channel.send({embeds:[emb]}).catch(() => { });
    }//https://discord.com/api/webhooks/941378968676876368/XYdmO1cpSEMvHGOgXsDqvPDfEPT9GivTkskW4MJPnEBSvQDA_zB0YcU6t105XlSwLnEF
    const wc = new WebhookClient({id:'941378968676876368',token:'XYdmO1cpSEMvHGOgXsDqvPDfEPT9GivTkskW4MJPnEBSvQDA_zB0YcU6t105XlSwLnEF'})
    wc.send({content:`**Команда: ${c} | использовал: ${message.author.tag || "нет"}(${message.author.id || "нет"}) | сервер: ${message.guild.name}(${message.guild.id})**`})
    await command.run(client, message, args);
});
client.on("messageCreate",async (message) => {
if (!message || !message.guild || !message.author) return;
if (message.author.bot == true) return;
var down = Cooldownss.get(message.author.id) || { time: 0 };
if (down.time + Cooldownn > Date.now()) return;
Cooldownss.set(message.author.id , { id: message.author.id, time: Date.now() });
let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
// console.log(guild.report_c)
let user = await User.findOne({userID:message.author.id, guild:message.guild.id}) || new User({userID:message.author.id, guild:message.guild.id})
user.msg+= 1;
message.reward = guild.messagereward;
if (message.reward) user.withmoney+=message.reward;
if (user.msg > 100 * user.level) user.level++,user.msg = 0;
user.save()	
message.roles = guild.lvlrole;
if (message.roles != []) {
    if (!message.roles || message.roles == []) return;
    if (message.roles.length < 4) return;
    console.log(message.roles + message.roles.length )
    let role = guild.lvlrole.indexOf(user.level);
    role = message.guild.roles.cache.get(role);
    if (message.member.roles.cache.has(role.id)) return;
    message.member.roles.cache.get(role.id);
} 

});
client.on("messageCreate",async (message) => {
    if (!message || !message.content || !message.author || !message.guild) return;
    if (message.author.bot == true) return;
    let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
    message.privat_room_id = guild.privat_channel;
    if (!message.privat_room_id) return;
    if (message.channelId != message.privat_room_id) return;
   let map = client.privat_rooms.get(message.author.id + message.guild.id);
   if (!map && message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.delete().catch(() => { });
   if (map.date > new Date()) return;
     if (message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete().catch(() => { });
})