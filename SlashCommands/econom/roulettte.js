const User = require('../../user.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "roulette",
    description: "рулетка",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "number",
            description: "сумма ставки",
            type: "NUMBER",
            required: true,
        },
       {
            name: "num",
            description: "ставка на позицию",
            type: "NUMBER",
            required: false,
        },
        {
            name: "string",
            description: "ставка на класс",
            type: "STRING",
            choices:[{name:"red",value:"red"},{name:"black",value:"black"},{name:"четное",value:"четное"},{name:"нечетное",value:"нечетное"}],
            required: false,
        },
    ],
    run: async (client, interaction) => {
        let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
        let number = interaction.options.getNumber("number");
        let string =  interaction.options.getString("string");
        let num = interaction.options.getNumber("num");
        if (!num && !string) return interaction.followUp({content: "укажите ставку!",ephemeral: true});
          let user = await User.findOne({ userID: interaction.user.id,guild:interaction.guild.id }) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
        if (user.withmoney < number) {
            let emb = new MessageEmbed()
            .setTitle("**Упс... Ошибка")
            .setDescription(`<@${interaction.user.id}>, похоже у Вас нехватка средств!`)
            .setColor("RED")
            return interaction.followUp({embeds:[emb]})
        }
         if (string == "black") string = "черное";
         if (string == "red") string = "красное"
         let ans = Math.floor(Math.random() * (37 - 1) + 1);
        let otv = "черное";
        let color; 
        if (ans == 1 || ans == 3 || ans == 5 || ans == 7 || ans == 9 || ans == 12 || ans == 14 || ans == 16 || ans == 19 || ans == 21 || ans == 23 || ans == 25 || ans == 27 || ans == 32 || ans == 36 || ans == 34) otv = "красное";
        if (otv == "черное" ) color = 'черное ⚫';
        if (otv == "красное") color = "красное 🔴";
        if (ans % 2 == 1 && string != "красное" && string != "черное") otv = "нечетное";
        if (ans % 2 == 0 && string != "красное" && string != "черное") otv = "четное";
        if (num) string = num;
        if (num) otv = ans;
        interaction.followUp('https://thumbs.gfycat.com/DistortedRecentEland-small.gif').then(msg => setTimeout(() => msg.delete(), 5000)).catch(() => { });
       let kol = 1;
       if (num) kol = 36;
       let col;
       if (color == "красное 🔴") col = "RED";
       if (color == 'черное ⚫') col = "BLACK"
       let ez = new MessageEmbed()
        .setDescription(`**Выпало: ${ans} ${color}**`)
        .setColor(col)
        setTimeout(() => { interaction.followUp({embeds:[ez]})}, 5000)
        if (string == otv)  { setTimeout(() => {
          interaction.followUp({
              embeds: [
                  {
                      title: "**Успешно ✅**",
                      description: `<@${interaction.user.id}> Вы успешно выйграли **${number * kol} ${guild.val}!**`,
                      color: "66ff00",
                      footer: {
                          text: `${interaction.user.username}`,
                      },
                      thumbnail: {
                        url: interaction.guild.iconURL({dynamic:true})
                      },
                      timestamp: new Date(),
                  },
              ],
          })
        
          

        }, 7000) 
        user.withmoney+=number * kol
      return  user.save(); 
        }
          
              if (string != otv)  { 
                  setTimeout(() => {
                interaction.followUp({
                    embeds: [
                        {
                            title: "**Провалено ❌**",
                            description: `<@${interaction.user.id}> Вы проиграли **${number } ${guild.val}!**`,
                        
                            color: "66ff00",
                            footer: {
                                text: `${interaction.user.username}`,
                            },
                            thumbnail: {
                                url: interaction.guild.iconURL({dynamic:true})
                            },
                           
                            timestamp: new Date(),
                        },
                    ],
                })
                
                
              }, 7000)
              user.withmoney-=number;
              user.save();
            }
          
            }

        }
