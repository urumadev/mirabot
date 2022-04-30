
const User = require('../../user.js');
const Guild = require('../../guild.js');
const Marry = require('../../marry.js');
const path = require('path')
const moment = require('moment')
const { createCanvas, loadImage } = require("canvas");
const Canvas = require('canvas')

const {MessageAttachment, Client, CommandInteraction,MessageActionRow, MessageButton,Interaction, MessageEmbed } = require("discord.js");
module.exports = {
    name: "marryprofile",
    description: "профиль пары",
    type: 'CHAT_INPUT',
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      //await interaction.deferReply({ephemeral:false}).catch(() => {});
        let user = await User.findOne({userID:interaction.user.id,guild:interaction.guild.id}) || new User({userID:interaction.user.id,guild:interaction.guild.id});
        if (user.marry == null) return interaction.followUp({content:"У тебя нет пары! :(",ephemeral:true});
        let marry = await Marry.findOne({guild:interaction.guild.id,users:interaction.user.id})
       const member = interaction.guild.members.cache.get(marry.user_1);
       const canvas = createCanvas(584, 158);
       const ctx = canvas.getContext("2d");
     
       const background = await loadImage(
         path.join(__dirname, '../../background.jpg')
       )
       ctx.beginPath();
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 
   
       const avatar  = await loadImage(member.user.displayAvatarURL({format : "jpg"}));
       const canvasAvatar1 = createCanvas(98, 98);
       const contextAvatar1 = canvasAvatar1.getContext('2d');
   
       contextAvatar1.lineWidth = 4;
       contextAvatar1.strokeStyle = "#ffffff";
       contextAvatar1.globalAlpha = 0.2;
       contextAvatar1.fillStyle = "#000000";
       contextAvatar1.fillRect(100,35,98,98);
       contextAvatar1.fill();
       contextAvatar1.globalAlpha = 1;
       contextAvatar1.strokeRect(100,35,98,98);
       contextAvatar1.stroke();
   
       contextAvatar1.beginPath();
       contextAvatar1.arc(98/2, 98/2, 98 / 2, 0, Math.PI * 2, true); // circle center [x, y], radius
       contextAvatar1.closePath();
       contextAvatar1.clip();
       contextAvatar1.drawImage(avatar, 0, 0, 98, 98);
       contextAvatar1.strokeStyle = "#ffffff";
       contextAvatar1.stroke();
       ctx.drawImage(canvasAvatar1, 100, 35, 98, 98);
   
        let member2 = interaction.guild.members.cache.get(marry.user_2);
       const avatar2  = await loadImage(member2.user.displayAvatarURL({format : "jpg"}));
   
       const canvasAvatar = createCanvas(98, 98);
       const contextAvatar = canvasAvatar.getContext('2d');
   
       contextAvatar.lineWidth = 4;
       contextAvatar.strokeStyle = "#ffffff";
       contextAvatar.globalAlpha = 0.2;
       contextAvatar.fillStyle = "#000000";
       contextAvatar.fillRect(100,35,98,98);
       contextAvatar.fill();
       contextAvatar.globalAlpha = 1;
       contextAvatar.strokeRect(100,35,98,98);
       contextAvatar.stroke();
   
       contextAvatar.beginPath();
       contextAvatar.arc(98/2, 98/2, 98 / 2, 0, Math.PI * 2, true); // circle center [x, y], radius
       contextAvatar.closePath();
       contextAvatar.clip();
       contextAvatar.drawImage(avatar2, 0, 0, 98, 98);
       contextAvatar.strokeStyle = "#ffffff";
       contextAvatar.stroke();
       ctx.drawImage(canvasAvatar, 400, 35, 98, 98);
     
       const serd  = await loadImage(path.join(__dirname, '../../serd.png'));
       const canvasAvatar2 = createCanvas(70, 70);
       const contextAvatar2 = canvasAvatar2.getContext('2d');
       contextAvatar2.beginPath();
       contextAvatar2.arc(70/2, 70/2, 70 / 2, 0, Math.PI * 2, true); // circle center [x, y], radius
       contextAvatar2.closePath();
       contextAvatar2.clip();
       contextAvatar2.drawImage(serd, 0, 0, 70, 70);
       contextAvatar2.stroke();
       ctx.drawImage(canvasAvatar2, 250, 45, 70, 70);

       const attachment = new MessageAttachment(canvas.toBuffer(),"card.png");
       
       let day = 1000 * 60 * 60 * 24;
       let date1 = new Date(interaction.createdTimestamp);
       let date2 = new Date(marry.reg);
       let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day)); //new Date(user.user.createdAt))} (${diff1} дней назад)
       let time = marry.voice;
       time /= 1000;
 const hours = Math.floor(time / 3.6e3);
 const minutes = Math.floor(time / 60) % 60;
    interaction.followUp ({
      	files: [attachment],
      embeds: [
          {
              title: "**Love profile**",
    
          
              color: "#fadadd",
              fields: [
                {
                  name: 'Пара:',
                  value: `**${member.user.username} 💗 ${member2.user.username}**`,
                },
                {
                  name: 'Баланс пары',
                  value: `${marry.bal}`,
                  inline:true
                },
                {
                  name: 'Списание платы:',
                  value: `${moment(marry.date).format(`DD.MM.YYYY/HH:mm:ss`) || "комната не куплена"}`,
                  inline:true
                },
                {
                  name: 'Парный онлайн:',
                  value: `\`${hours} ч. ${minutes} м.\``,
                  inline:true
                },
                {
                  name: `Дата регистрации:`,
                  value: `${diff1} дней назад`,
                  inline:true
                },
               ],
              footer: {
                  text: `${interaction.user.username}` ,
                  url: interaction.user.avatarURL({dynamic:true})
              },
            	image: { url: "attachment://card.png" },
            
             
              timestamp: new Date(),
          },
      ],
  });
    }
};

