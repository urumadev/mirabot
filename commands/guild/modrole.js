const { MessageEmbed } = require("discord.js");
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "modrole",
    aliases: ['mr'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete()
        let guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if (args[0] == "off") {
            guild.modrole = [];
            guild.save()
            return message.channel.send({ embeds: [{ color: "GREEN", title: "Успешно ✅", description: `**${message.author}, Вы успешно убрали роли!**` }]});
        }
        let er1 = new MessageEmbed()
        .setTitle('Ошибка ❌')
        .setColor("#d30d27")
        .setDescription(`${message.author}, Вы забыли указать роль!`)
        const role1 = message.mentions.roles.first();
        const role2 = message.mentions.roles.first();
        const role3 = message.mentions.roles.first();
        const role4 = message.mentions.roles.first();
        const role5 = message.mentions.roles.first();
        if(!args[0]) return message.channel.send({embeds:[er1]});
        let er2 = new MessageEmbed()
        .setTitle('Ошибка ❌')
        .setColor("#d30d27")
        .setDescription(`${message.author}, Вам необходимо указать действительные роли!`)
        if (args[0] && !role1) return message.channel.send({embeds:[er2]});
        if (args[1] && !role2) return message.channel.send({embeds:[er2]});
        if (args[2] && !role3) return message.channel.send({embeds:[er2]});
        if (args[3] && !role4) return message.channel.send({embeds:[er2]});
        if (args[4] && !role5) return message.channel.send({embeds:[er2]});
      let er3 = new MessageEmbed()
      .setTitle('Ошибка ❌')
      .setColor("#d30d27")
      .setDescription(`${message.author}, нельзя поставить роль, которая управляется интеграцией!`)
        if (role1.managed) return message.channel.send({embeds:[er3]});
        if (args[1] && role2.managed) return message.channel.send({embeds:[er3]});
        if (args[2] && role3.managed) return message.channel.send({embeds:[er3]});
            if (args[5]) return message.reply('можно поставить всего 5 роли для модерирования!');
        let array = [];
        message.mentions.roles.forEach(x => array.push(x.id));
        guild.modrole = array;
            const embed = new MessageEmbed()
                .setDescription('✅Вы успешно поставили роль для модераторов!')
                .setColor(guild.emb)
                .setFooter({text:message.member.displayName, iconURL:message.author.avatarURL({ dynamic: true })});
            guild.save().then(() => message.channel.send({ embeds: [embed] })).catch(e => console.log(`[prefix.js] ${e}`));
            
        
    
    }
};
