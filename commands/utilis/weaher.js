const { MessageEmbed } = require("discord.js");
const Discord = module.require("discord.js");
const weather = require("weather")
const User = require("../../user.js");
const Guild = require("../../guild.js");
module.exports = {
    name: "weather",
    aliases: ['weather'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const guild = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
        if(message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
        weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
            if(error) return message.reply('**укажите верное метсоположение!**');
            if(!args[0]) return message.reply('**укажите верное метсоположение!**');
            if (args[0].length > 35) return message.reply('укажи город длиной в 35 символов!');
            if(result === undefined || result.length === 0) return message.reply('**неверное** местоположение!');
            var current = result[0].current;
            var location = result[0].location;
            let a = (result[0].current.feelslike - 32) / 1.8;
            let e = (result[0].current.temperature - 32) / 1.8;
            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setTitle(`Прогноз погоды на сегодня ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(guild.emb)
            .addField('Часовой пояс🕕', `UTC${location.timezone}`, true)
            .addField('Температура🌡',`${Math.floor(e)}°`, true)
            .addField('Ветер💨', `${result[0].current.winddisplay}`, true)
            .addField("Скорость ветра", result[0].current.windspeed, true)
            .addField('Влажность💦', `${result[0].current.humidity}%`, true)
            .addField('Ощущается как', `${Math.floor(a)}°`, true)
            .setTimestamp()
            .setFooter({text:message.author.username});
            message.channel.send({embeds:[weatherinfo]})
        })

    }
};
