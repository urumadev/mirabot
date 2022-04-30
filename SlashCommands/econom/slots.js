const User = require('../../user.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "slots",
    description: "казино",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "number",
            description: "сумма ставки",
            type: "NUMBER",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        const number = interaction.options.getNumber("number");
          let user = await User.findOne({ userID: interaction.user.id,guild:interaction.guild.id }) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
          const guild = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
          if (guild.ec != "on") return interaction.followUp({embeds: [{color: "#d30d27", title:"Ошибка ❌",description: `<@${interaction.user.username}, на сервере не включена экономика!`}]});
            if (user.withmoney < number) return interaction.followUp({embeds: [{color: "#d30d27", title:"Ошибка ❌",description: `<@${interaction.user.username}, у Вас нехватка средств!`}]});
            let fr_1 = Math.floor(Math.random() * (6 - 1) )+ 1;
            let fr_2 = Math.floor(Math.random() * (6 - 1) )+ 1;
            let fr_3 = Math.floor(Math.random() * (6 - 1) )+ 1;
            let fr_4 = Math.floor(Math.random() * (6 - 1) )+ 1;
            let fr_5 = Math.floor(Math.random() * (6 - 1) )+ 1;
            let s = `${fr_1}${fr_2}${fr_3}${fr_4}${fr_5}`;
            let prize = 0;
            let reit = {}; 
            for (let i = 0; i < s.length; i++) { 
            reit[s[i]] = reit[s[i]] ? reit[s[i]] + 1 : 1; 
            } 
        
            let res =
            Object.entries(reit) 
            .sort((a, b) => b[1] - a[1])
            .map((x) => `${x[1] }`) [0]
            
            if (res == 3) prize = 2;
            if (res == 4) prize = 3;
            if (res == 5) prize = 4;
            if (fr_1 == 1) fr_1 = "🍉";
            if (fr_1 == 2) fr_1 = "🍇";
            if (fr_1 == 3) fr_1 = "🍓";
            if (fr_1 == 4) fr_1 = "🫐";
            if (fr_1 == 5) fr_1 = "🍒";
            //
            if (fr_2 == 1) fr_2 = "🍉";
            if (fr_2 == 2) fr_2 = "🍇";
            if (fr_2 == 3) fr_2 = "🍓";
            if (fr_2 == 4) fr_2 = "🫐";
            if (fr_2 == 5) fr_2 = "🍒";
            //
            if (fr_3 == 1) fr_3 = "🍉";
            if (fr_3 == 2) fr_3 = "🍇";
            if (fr_3 == 3) fr_3 = "🍓";
            if (fr_3 == 4) fr_3 = "🫐";
            if (fr_3 == 5) fr_3 = "🍒";
            ///
            if (fr_4 == 1) fr_4 = "🍉";
            if (fr_4 == 2) fr_4 = "🍇";
            if (fr_4 == 3) fr_4 = "🍓";
            if (fr_4 == 4) fr_4 = "🫐";
            if (fr_4 == 5) fr_4 = "🍒";
            //
            if (fr_5 == 1) fr_5 = "🍉";
            if (fr_5 == 2) fr_5 = "🍇";
            if (fr_5 == 3) fr_5 = "🍓";
            if (fr_5 == 4) fr_5 = "🫐";
            if (fr_5 == 5) fr_5 = "🍒";
            interaction.followUp({embeds: [{title:"🎰 Казино",color: "#dce400", description: fr_1 + "|" + fr_2 + "|" + fr_3 + "|" + fr_4 + "|" + fr_5 + "|"}]});
            
            if (prize == 0) {
                user.withmoney -= number;
                user.save();
                setTimeout(() => {interaction.followUp({embeds: [{color: "#d30d27", description: `**${interaction.user.username}, Вы проиграли ${number} ${guild.val}!**`}]}) }, 2000);
                return;
            };
                user.withmoney = user.withmoney + Math.floor(number * prize);
                user.save();
                setTimeout(() => {   interaction.followUp({embeds: [{color: "#24ed49", description: `**${interaction.user.username}, Вы выйграли ${Math.floor(number * prize)} ${guild.val}!**`}]})}, 2000);
            }
        }
