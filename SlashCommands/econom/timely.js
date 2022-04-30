const { QueryType } = require("discord-player");
const User = require('../../user.js');
const Shop = require('../../shop.js');
const Guild= require('../../guild.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "timely",
    type: 'CHAT_INPUT',
    description: "получить ежедневный бонус",
    run: async (client, interaction) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        
        let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
        let user = await User.findOne({userID:interaction.user.id,guild:interaction.guild.id}) || new User({userID:interaction.user.id,guild:interaction.guild.id});
        let shop = await Shop.findOne({id:interaction.guild.id}) || new Shop({id:interaction.guild.id})
        let t = Math.floor(Math.random() * (100-20) + 20)
        
        let err = new MessageEmbed()
        .setTitle("❌ Ошибка")
        .setDescription("Вы уже недавно использовали бонус, подождите 24 часа!")
        .setColor("RED")
        if (user.kd1 == "+") return  interaction.followUp({embeds:[err]})
        user.kd1 = '+';
        user.withmoney+=t;
    user.save()
    interaction.followUp({
        embeds: [
            {
              
                description: `<@${interaction.user.id}> Вы успешно получили ежденевный бонус в размере **${t} ${guild.val || " "}\n> Ваш баланс: \`${user.withmoney}\`!**`,
                color: "66ff00",
                footer: {
                    text: `${interaction.user.username}`,
                },
                timestamp: new Date(),
            },
           
        ],
    })
    
    function s() {
        user.kd1 = null;
        user.save()
    }setTimeout(s, 864 * 2 * 10000)
    }
};
