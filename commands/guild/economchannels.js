const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "economchannels",
    aliases: ['economchannels'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
        let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        let prav = new MessageEmbed()
        .setTitle('Ошибка ❌')
        .setDescription(`**${message.author}, у Вас нехватка прав.\nТребуемые права: \`Управлять сервером\`**`)
        .setColor("#d30d27")
        if(!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send({embeds:[prav]});
        if (!args[0]) return message.reply('укажите канал(ы)');
        if (args[0] == 'off') return guild.ecc = [], guild.save();
        if (args[7]) return message.reply('вы можете указать всего 7 каналов!');
        let a = message.mentions.channels.first();
          let b = message.mentions.channels.first();
          let c  = message.mentions.channels.first();
          let d = message.mentions.channels.first();
          let f = message.mentions.channels.first();
          let e = message.mentions.channels.first();
          let h = message.mentions.channels.first();
          let er1 = new MessageEmbed()
          .setColor("#d30d27")
          .setTitle(`Ошибка ❌`)
          .setDescription(`${message.author}, укажите действительный канал!`)
          if (args[0] && !a) return message.channel.send({embeds:[er1]});
          if (args[1] && !b) return message.channel.send({embeds:[er1]});
          if (args[2] && !c) return message.channel.send({embeds:[er1]});
          if (args[3] && !d) return message.channel.send({embeds:[er1]});
          if (args[4] && !f) return message.channel.send({embeds:[er1]});
          if (args[5] && !e) return message.channel.send({embeds:[er1]});
          if (args[6] && !h) return message.channel.send({embeds:[er1]});
          let er2 = new MessageEmbed()
          .setColor("#d30d27")
          .setTitle(`Ошибка ❌`)
          .setDescription(`${message.author}, один из указанных каналов не удовлетворяет типу: текстовый`)
          if(args[0] && a.type != "GUILD_TEXT" ) return message.channel.send({embeds:[er2]});
          if(args[1] && b.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]});
          if(args[2] && c.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]});
          if(args[3] && d.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]});
          if(args[4] && f.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]});
          if(args[5] && e.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]});
          if(args[6] && h.type != "GUILD_TEXT") return message.channel.send({embeds:[er2]}); 
               
        let array = [];
        message.mentions.channels.forEach(x => array.push(x.id));
        guild.ecc = array;
        
        const embeds = new MessageEmbed()
        .setDescription('✅Ты успешно поставил канал(ы) в которых можно будет использовать экономику!')
        .setColor(guild.emb)
        .setFooter({text:message.member.displayName, iconURL:message.author.avatarURL({ dynamic: true })});
         guild.save().then(() => message.channel.send({ embeds: [embeds] })).catch(e => console.log(`[prefix.js] ${e}`));
    }
};
