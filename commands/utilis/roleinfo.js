const { MessageEmbed } = require('discord.js');
const Guild = require("../../guild.js");
module.exports = {
    name: "roleinfo",
    aliases: ['rli'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let guild = await Guild.findOne({id:message.guild.id}) || new Guild({id:message.guild.id});
        let err_emb = new MessageEmbed()
        .setTitle("❌ Ошибка")
        .setColor("#d30d27")
        .setDescription(`${message.author}, Вам необходимо указать действительную роль!`)
        .setTimestamp()
     try {
         let roleName = message.guild.roles.cache.find(r => (r.name === args.join(" ").toString()) || (r.id === args.join(" ").toString())) || message.mentions.roles.first();
         if (!roleName) return message.channel.send(err_emb);
         if (!args[0]) return message.channel.send(err_emb);
         let day = 1000 * 60 * 60 * 24;
         let date1 = new Date(roleName.createdTimestamp);
         let date2 = new Date(roleName.createdAt);
         let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day));
         let ch_cr = strftime('%d.%m.%Y в %H:%M', new Date(roleName.createdAt));
         const embed = new MessageEmbed()
             .setColor(guild.emb)
             .setTitle('Информация о роли')
             .setTimestamp()
             .setFooter({text:message.author.username})
             .addFields(
                 {
                     name: 'ID Роли: ',
                     value: roleName.id,
                     inline: true
                 },
                 {
                     name: 'Название роли: ',
                     value: roleName.name,
                     inline: true
                 },
                 {
                     name: 'Возможность к упоминанию<:__:761164479445860354> ',
                     value: roleName.mentionable ? 'Да' : 'Нет',
                     inline: true
                 },
                 {
                     name: 'Кол-во пользователей с ролью',
                     value: roleName.members.size,
                     inline: true
                 },
                 {
                     name: 'Позиция роли',
                     value: roleName.position,
                     inline: true
                 },
                 {
                     name: 'Цвет роли',
                     value: roleName.hexColor,
                     inline: true
                 },
                 {
                     name: 'Отображение в топе',
                     value: roleName.hoist ? "Да" : "Нет",
                     inline: true
                 },
                 {
                     name: 'Интегрированная роль',
                     value: roleName.managed ? "Да" : "Нет",
                     inline: true
                 },
                 {
                     name: 'Дата создания',
                     value: `${ch_cr} (${diff1} дней назад)`,
                     inline: true,
                 },
                 
             )
 
         await message.channel.send({embeds:[embed]})
 
     } catch (e) {
         return message.channel.send({embeds:[err_emb]});
     }
 
}
}