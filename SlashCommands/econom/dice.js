const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "dice",
    description: "кубик",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "bet",
            description: "ставка",
            type: "NUMBER",
            required:true,
        },
        {
            name: "number",
            description: "число от 1 до 6",
            type: "NUMBER",
            required: true,
        },
      
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
     let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
    let string = interaction.options.getNumber("number");
    let bet = interaction.options.getNumber("bet");
    let user = await User.findOne({userID:interaction.user.id, guild:interaction.guild.id}) || new User({userID:interaction.user.id, guild:interaction.guild.id})
if (string < 1 || string > 6) return interaction.followUp({content:"**Укажите ставку от 1 до 6**!",ephemeral:true});
string = Math.floor(string);
bet = Math.floor(bet)
if (bet > user.withmoney)return interaction.followUp({content:"**У вас нехватка средств!**!",ephemeral:true});
    let res = Math.floor(Math.random() * 6 + 1);
let at = interaction.user.username;

if (args[1] == res)  {
    a = await interaction.followUp({content:"Подбрасываю кубик🎲..."}).then(msg => 
   setTimeout(() => {
     msg.delete()
   }, 5000))
   interaction.followUp({content:`**Выпало: ${res}🎲**`})
   interaction.followUp({content:`**${at} Вы выйграли ${bet * 6} ${guild.val}!**`}),user.withmoney = user.withmoney + (Number(bet) * 6),user.save();
   }
///////////////
if (args[1] != res)  {
 a = await interaction.followUp({content:"Подбрасываю кубик🎲..."}).then(msg => 
setTimeout(() => {
   msg.delete()
}, 5000))
interaction.followUp({content:`**Выпало: ${res}🎲**`})
interaction.followUp({content:`**${at} Вы проиграли ${bet} ${guild.val}!**`}),user.withmoney = user.withmoney - Number(bet),user.save();
}
},
};