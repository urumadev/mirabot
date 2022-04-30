const { MessageEmbed } = require("discord.js");
const User = require('../../user.js');

const Marry = require('../../marry.js');
module.exports = {
    name: "marry",
    aliases: ['mar'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
let m = message.mentions.members.first();
if (!m) return message.reply('укажите пользователя!');
let member = message.guild.members.cache.get(m.id);
if (member.id == message.author.id) return message.reply('зачем указывать себя?');
let user = await User.findOne({ userID: message.member.id,guild:message.guild.id }) || new User({ userID: message.member.id,guild:message.guild.id });
let user_2 = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID:member.id,guild:member.guild.id });
if (user_2.marry != null) return message.reply('данный пользователь уже состоит в браке!');
if (user.marry != null) return message.reply('вы состоите в браке!');
message.channel.send({embeds: [{ title:"Предложение <a:MarryMeLaceyNOWWOWW:940933161901252682>",description: `**${message.author} сделал предложение руки и сердца пользователю ${member.user.username}\n> Вы должны ответить Да / Нет!**`}]});
const filter = (message) => message.author.id === member.id;
var col1 = message.channel.createMessageCollector( {filter, max: 1, time: 1800000 });
col1.on("collect", async (m) => {
if(m.content.toLowerCase() == 'да')
{
message.channel.send({embeds: [{color: "GREEN", title:"Успешно <a:redcheckmark:940933677213450253>",description: `**${message.author}, теперь вы муж и жена!**`}]});
let ar = [];
ar.push(member.id)
ar.push(message.member.id);
let marry = await Marry.findOne({users:ar,guild:message.guild.id}) || new Marry({users:ar,guild:message.guild.id})
marry.user_1 = message.member.id;
marry.reg = new Date()
marry.user_2 = member.id;
marry.users = ar;
marry.save() 
user.marry = member.id;
user_2.marry = message.author.id;
return user.save(),user_2.save(); 
};
if(m.content.toLowerCase() == 'нет')
message.channel.send({embeds: [{color: "RED", title:"Провал <a:red_false_cross:940934230584729600>",description: `**${message.author}, у вас не получилось пожениться!**`}]});
else
message.channel.send('Укажите в ответ "Да" или "Нет"')
col1.on('end', async (collected) => {
    if (collected.size == 0) message.channel.send(`Время ожидания заверишлось, ${member.id} ничего не написал.`)
 })
})
    }
}
