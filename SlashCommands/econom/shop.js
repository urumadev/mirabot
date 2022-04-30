
const Guild = require('../../guild.js');
const User = require('../../user.js');
const Prem = require('../../prem.js');
const Shop = require('../../shop.js');
const {stripIndents} = require("common-tags")
const { Client, CommandInteraction,MessageActionRow, MessageButton,Interaction,MessageEmbed } = require("discord.js");
module.exports = {
    name: "shop",
    description: "магазин",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        await interaction.deferReply({ephemeral:true}).catch(() => {});
        let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id});
        let shop = await Shop.findOne({id:interaction.guild.id}) || new Shop({id:interaction.guild.id});
        const button1 = new MessageButton()
        .setEmoji("<a:HF_arrowL:945697532703555614> ")
        .setStyle("SECONDARY")
        .setCustomId("buy1");
        const button2 = new MessageButton()
        .setEmoji("<a:zarrowrose2:945697518635855882>")
        .setStyle("SECONDARY")
        .setCustomId("buy2");
        const button3 = new MessageButton()
        .setLabel("Активировать предмет")
        .setStyle("SUCCESS")
        .setCustomId("buy3");
    const buttons = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)
        .addComponents(button3)
        let p = 1;
        let txt = " ";
        if (!shop.roles || shop.roles == []) txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
      if (shop.roles)   for(var i = 0; i<shop.roles.length; i++) {
        txt += `[#${p++}] <@&${shop.roles[i]}> - \`${shop.roles_pr[i]}\` ${guild.val}\n`
         }
         if (txt == " ") txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
    let emb = new MessageEmbed()
    .setAuthor({name: "Магазин"})
    .setTitle(`**Роли**`)
    .setColor("GREEN")
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    .setDescription( stripIndents `**${txt}**`)
 await  interaction.followUp({embeds:[emb], components: [buttons]});

  },//, components: [buttons]
};
////["1","2"]
///1
///2
