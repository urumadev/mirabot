
const { MessageEmbed } = require('discord.js');
const Guild = require('../../guild.js');
const { Client, CommandInteraction } = require("discord.js");
const User = require('../../user.js');
module.exports = {
    name: "ball",
    description: "шарик",
    type: 'CHAT_INPUT',
    options: [
      
        {
            name: "string",
            description: "вопрос",
            type: "STRING",
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
    let string = interaction.options.getString("string");
    if (string.length < 2 || string.length > 300) return interaction.followUp({content:"**Укажите длину текста меньше 300 символов!",ephemeral:true});
    let replies = [
        'Бесспорно',
        'Предрешено',
        'Никаких сомнений',
        'Определённо да',
        'Можешь быть уверен в этом',
        'Мне кажется да',
        'Вероятнее всего',
        'Хорошие перспективы',
        'Знаки говорят да',
        'Да',
        'Пока не ясно, попробуй снова',
        'Спроси позже',
        'Лучше не рассказывать',
        '50 на 50',
        'Сейчас нельзя предсказать',
        'Сконцентрируйся и спроси опять',
        'Даже не думай',
        'Мой ответ нет',
        'По моим данным нет',
        'Перспективы не очень хорошие',
        'Весьма сомнительно.',
        'Нет',
        'Скорее нет , чем да',
        'Возможно , но не факт',
        'Я не уверен',
        'Скорее да , чем нет',
        'Точно!',
        'Нет!',
        'Конечно',
        'Даже не сомневайся в этом',
       'Не буду спорить с тобой',
        '100 %',
        'Я еще не подумал , попробуй еще раз',
        'Именно!',
        'Я даже не знаю что сказать...'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let emb = new MessageEmbed()
    .setColor(guild.emb)
    .setTitle('🎱 Магический Шар!') 
    .addField('**Вопрос:**',string)
.addField('**Ответ:**',replies[result])
.setTimestamp()
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setFooter({text:interaction.user.username})
interaction.followUp({embeds:[emb]}).catch(() =>{});
    

    },
};
