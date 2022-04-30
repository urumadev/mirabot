const { MessageEmbed } = require("discord.js");
const User = require('../../user.js');

const Marry = require('../../marry.js');
module.exports = {
    name: "divorce",
    aliases: ['divorce'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user = await User.findOne({ userID: message.member.id,guild:message.guild.id }) || new User({ userID: message.member.id,guild:message.guild.id });
        if (!user.marry) return message.reply("у тебя нет пары!");
let member = message.guild.members.cache.get(user.marry);
let user_2 = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID:member.id,guild:member.guild.id });
message.channel.send({content:`<@${member.id}> Вы должны ответить Да / Нет!`,embeds: [{ description: `**${message.author} Хочет развестись с <@${member.user.username}>**`}]});
const filter = (message) => message.author.id === member.id;
var col1 = message.channel.createMessageCollector( {filter, max: 1, time: 1800000 });
col1.on("collect", async (m) => {
if(m.content.toLowerCase() == 'да')
{
message.channel.send({embeds: [{color: "GREEN", title:"Успешно <a:redcheckmark:940933677213450253>",description: `**${message.author}, больше вы не муж и жена!**`}]});
user.marry = null;
user_2.marry = null;
await Marry.deleteOne({ users: message.member.id,guild:message.guild.id}).catch(() => { });
return user.save(),user_2.save(); 


};
if(m.content.toLowerCase() == 'нет')
message.channel.send({embeds: [{color: "RED", title:"Провал <a:red_false_cross:940934230584729600>",description: `**${message.author}, У вас не получилось развестить!**`}]});
else
message.channel.send('Укажите в ответ "Да" или "Нет"')
col1.on('end', async (collected) => {
    if (collected.size == 0) message.channel.send(`Время ожидания заверишлось, ${member.id} ничего не написал.`)
 })
})
    }
}
