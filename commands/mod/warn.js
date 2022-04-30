const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
const ms = require('ms');
module.exports = {
    name: "warn",
    aliases: ['варн'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      let prav = new MessageEmbed()
      .setTitle('Ошибка ❌')
      .setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Управлять сообщениями\`**`)
      .setColor("#d30d27")
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(prav);
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send('**<a:net:810429654741680166>Ошибка**\n**У меня нет необходимых прав.\n> Выдайте право  ,,Управлять сообщениями"** ').catch(() =>{});
        
        let member = message.mentions.members.first();
        const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
          let embs = new MessageEmbed()
          .setDescription(`**${message.member}Ошибка\n**Ты забыл упомянуть кого-нибудь!`)
          .setColor(guild.emb)
        if (!member) return message.channel.send(embs).catch(() =>{});
        if(member == message.member.id) return message.reply('не нужно предупреждать себя!').catch(() =>{});
        testss = new MessageEmbed()
        .setDescription('не нужно предупреждать бота!')
        .setColor(guild.emb);
        if(member.user.bot === true) return message.channel.send({embed:testss});
       let  e = member.roles.highest.position;
            let  a = message.guild.me.roles.highest.position;
              let ess = new MessageEmbed()
              .setDescription(`${message.author} поставьте роль бота выше, чем роль у данного пользователя!`)
              .setColor(guild.emb)
              if (e > a || e == a) return message.channel.send(ess);
          if(member.permissions.has("MANAGE_MESSAGES")) return message.reply('**не нужно предупреждать модератора!**');
        let botmessage = args.splice(1).join(' ') || "без причины"
     

      
         let user = await User.findOne({ userID: member.id,guild:message.guild.id }) || new User({ userID: member.id,guild:message.guild.id });
         let limit;
         if (guild.warnslimit != null) limit = `/${guild.warnslimit}`;
         if (guild.warnslimit == null) limit = '';
         user.warns = user.warns + 1;
         user.save();
            const emb = new MessageEmbed()
                .setDescription(`**Пользователь \`${member.user.tag}\`  получил предупреждение\n Причина - \`${botmessage}\` | нарушений у пользователя: ${user.warns}${limit}**` )
            .setColor(guild.emb)
          message.channel.send({ embeds: [emb]}).catch(() =>{});
          let emd = new MessageEmbed()
          .setDescription(`**Вы получили предупреждение на сервеере \`${message.guild.name}\`\nПричина: \`${botmessage}\` | предупреждение выдал: ${message.author.tag}**`)
          .setColor(guild.emb)
          member.send(emd).catch(() =>{});
          
          if (guild.warnslimit != null && user.warns == guild.warnslimit && !message.guild.me.permissions.has("KICK_MEMBERS") && guild.nk == 'kick') return message.channel.send(`Я не смог выгнать данного пользователя.`),user.warns = 0,user.save();
          if (guild.warnslimit != null && user.warns == guild.warnslimit && message.guild.me.permissions.has("KICK_MEMBERS") && guild.nk == 'kick') await message.guild.member(member).kick(botmessage),message.channel.send('**Пользователь был кикнут!**'),user.warns = 0,user.save().catch(() => {});
          ////////////////////
          if (guild.warnslimit != null && user.warns == guild.warnslimit && !message.guild.me.permissions.has("BAN_MEMBERS") && guild.nk == 'ban') return message.channel.send(`Я не смог забанить данного пользователя.`),user.warns = 0,user.save();
          if (guild.warnslimit != null && user.warns == guild.warnslimit && message.guild.me.permissions.has("BAN_MEMBERS") && guild.nk == 'ban') await message.guild.member(member).ban(botmessage),message.channel.send('**Пользователь был забанен!**'),user.warns = 0,user.save().catch(() => {});
      
    }
};
