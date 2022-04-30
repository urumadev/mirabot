const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const ms = require('ms');
const moment = require("moment");
module.exports = {
    name: "mute",
    aliases: ['мут'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    let m = message.mentions.members.first();
    if (!m) return message.reply("укажите пользователья!")
    let member = message.guild.members.cache.get(m.id);
    let time = args[1]
    let reason = args.slice(2).join(" ") || "без причины";
    let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
    let role = message.guild.roles.cache.get(guild.mt);
    if (!role) return message.reply("на сервере нет роли мута!");
    if (member.id == message.author.id) return message.reply("**зачем мутить себя?!**");
  if (member.roles.cache.has(role.id)) return message.reply("**пользователь уже в муте!**")
    if (ms(time) < 6e4) return message.reply("**укажите время больше минуты!**")
    let toms =  ms(time);
let result = Math.floor(toms / 1000);
if (!result) return message.reply("**Укажите корректное время!**")
let user = await User.findOne({ userID: member.id,guild:member.guild.id }) || new User({ userID: member.id,guild:member.guild.id });
user.reason = reason;
user.time = time;
user.muteinfo = moment(Date.now()).format('DD.MM.YYYY/HH:mm:ss');
let timestamp = new Date().getTime();
let mutedUntil = new Date();
mutedUntil.setTime(timestamp + ms(time));
user.unmute = mutedUntil;
user.muted = true;
user.save().catch(() => {});
member.roles.add(role.id).catch(() =>{});
const emsb = new MessageEmbed()
.setDescription(`**<@${member.id}>** получил мьют на **${ms(ms(time))}**\n Причина - \`${reason}\` | выдал мут **<@${message.member.id}>**`)
message.channel.send({ embeds: [emsb] }).catch(() => {});
var embeds = new MessageEmbed()
.setTitle('Вы были замьючены!')
.setColor("RED")
.setDescription(`**Причина:** \`${reason}\`\n **Мут выдал:** \`${message.author.tag}\`\n**Длительность мута:** \`${ms(ms(time))}\`\n**Сервер:** ${message.guild.name}`)
     .setTimestamp()
member.send({embeds:[embeds]}).catch(() =>{})
    }
};
