const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
const Guild = require('../../user.js');
const Canvas = require('canvas');
const Discord = require('discord.js');
const canvacord = require("canvacord");
let strftime = require("strftime")
const { stripIndents } = require('common-tags');
module.exports = {
    name: "rank",
    description: "посмотреть ранк-карточку пользователя",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "пользователь",
            type: 6,
            required: false,
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
        let guild = await Guild.findOne({id:interaction.guild.id}) || Guild({id:interaction.guild.id});
        let m = interaction.options.getUser("user");
        let a;
        if (m == null) a = 1;
        let user =   await User.findOne({ userID: interaction.user.id,guild:interaction.guild.id}) || new User({ userID: interaction.user.id,guild:interaction.guild.id });
        if (m) user = await User.findOne({ userID: m.id,guild:interaction.guild.id }) || new User({ userID: m.id,guild:interaction.guild.id });
        let member = interaction.guild.members.cache.get(interaction.user.id)
         if (m) member = interaction.guild.members.cache.get(m.id) 
         let top = await User.find({guild:interaction.guild.id, level: { $gte: user.level }}).countDocuments();

        //  const img = "https://cdn.discordapp.com/embed/avatars/0.png";

    img = guild.rankimage || "https://cdn.discordapp.com/attachments/774920150600253471/941210191213522974/1612462855_75-p-sero-belii-fon-odnotonnii-90.png";
    const av = `${member.user.avatarURL({dynamic:false,format:"png"})}`;
    const rank = new canvacord.Rank()
        .setAvatar(av)
        .setCurrentXP(user.msg)
        .setRequiredXP((user.level)* 100)
        .setStatus("dnd")
        .setRank(top,"Позиция ")
        .setLevel(user.level,"Лвл")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setBackground("IMAGE",img)
    
    rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            interaction.followUp({ files: [attachment] });
        });
    }
};