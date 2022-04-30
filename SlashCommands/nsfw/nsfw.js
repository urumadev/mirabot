const User = require('../../user.js');
const { MessageEmbed } = require("discord.js");
const Guild= require('../../guild.js');
const superagent = require("superagent");
module.exports = {
    name: "nsfw",
    description: "посмотреть nsfw команды",
    type: 'SUB_COMMAND',
    options: [
                    
        {
            name: "name",
            description: "выбрать вариант",
            type: "STRING",
            choices:[{name:"classik",value:"classik"},{name:"paizuri",value:"paizuri"},{name:"yuri",value:"yuri"},{name:"anal",value:"anal"},{name:"pfig",value:"pgif"},{name:"4k",value:"4k"},{name:"kuni",value:"kuni"},{name:"pussy",value:"pussy"},{name:"ass",value:"ass"}],
            required: true,
        },
    ],
    run: async (client, interaction) => {
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
    if (interaction.channel.nsfw == false) return interaction.followUp({ embeds: [{ color: "RED", title: "Ошибка ❌", description: `**<@${interaction.user.id}>, Этот канал не является \`nsfw\`!**` }]});
    let str = interaction.options.getString("name");
    let img;
    let body;
    if (str == "yuri") body = await superagent.get("https://nekos.life/api/v2/img/yuri");
    if (str == "ass" ) img = await require('node-fetch')(`https://nekobot.xyz/api/image?type=hboobs`).then(r => r.json()).then(r => img = r.message);
    if (str == "anal") body = await superagent.get("https://nekos.life/api/v2/img/anal")
    if (str == "pgif") img = await require('node-fetch')(`https://nekobot.xyz/api/image?type=pgif`).then(r => r.json()).then(r => img =r.message);
    if (str == "4k") img = await require('node-fetch')(`https://nekobot.xyz/api/image?type=4k`).then(r => r.json()).then(r => img =r.message)
    if (str == "kuni") body = await superagent.get("https://nekos.life/api/v2/img/kuni")
    if (str == "pussy") body = await superagent.get("https://nekos.life/api/v2/img/pussy");
    if (str == "paizuri") img = await require('node-fetch')(`https://nekobot.xyz/api/image?type=paizuri`).then(r => r.json()).then(r => img = r.message)
      if (str == "classik") body = await superagent.get("https://nekos.life/api/v2/img/classic")
    
    if (!img) img = body._body.url
    let emb = new MessageEmbed()
        .setTitle("Наслаждайся")
        .setImage(img)
        .setTimestamp()
        interaction.followUp({embeds:[emb]});
}
        }
