const { MessageEmbed, CommandInteractionOptionResolver } = require("discord.js");
const client = require("../index");
const User = require('../user.js');
const Guild = require('../guild.js');
const Shop = require('../shop.js');
const Marry = require("../marry.js");
client.queue = new Map();
client.privat_rooms = new Map()
const { WebhookClient } = require('discord.js');
const ms = require("ms")
const { stripIndents } = require('common-tags');

  
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!interaction.guild) return;
        if (!interaction.guild.me.permissions.has("USE_APPLICATION_COMMANDS")) return;
        if (!cmd) return interaction.followUp({ content: "**Произошла ошибка!**", ephemeral: true })
        // if (cmd.name == "play") return interaction.followUp({content:"К сожалению, эта команда сейчас не доступна!"})
        if (cmd.name != "shop" && cmd.name != "premium" && cmd.name != "help") await interaction.deferReply({ ephemeral: false }).catch(() => { });
        // if (cmd.name == "shop")  await interaction.deferReply({ephemeral:true}).catch(() => {});
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        let c = cmd.name;
        let guild = await Guild.findOne({ id: interaction.guild.id }) || Guild({ id: interaction.guild.id });
        const wc = new WebhookClient({ id: '821069161219752026', token: 'YTOhPjDh3DhJoLep55HgsoxPKKyDobIJYIgolRrh_soyU6YES_dToDeIlGHyotzLUVJf' })

        wc.send({ content: `**Интеракция: ${c} | использовал: ${interaction.user.tag || "нет"}(${interaction.user.id || "нет"}) | сервер: ${interaction.guild.name}(${interaction.guild.id})**` })
        cmd.run(client, interaction, args);
    }
    if (interaction.isSelectMenu()) {
        // await interaction.deferUpdate()
        let guild = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        const page = interaction.values[0];
        if (page == "1") {
            let emb = new MessageEmbed()
                .setTitle(`**Настройка сервера**`)
                .setDescription(stripIndents`${guild.prefix}guild \`<необходимый аргмуент>\`
    
               **\`\`\`Доступные аргументы:\`\`\`**
    **warns** - установить необходимый лимит по варнам
    **color** - установить цвет эмбедов
    **reportchannel** - установить канал для репортов
    **prefix** - установит префикс сервера
    **stats** - включит мониторинг сервера
    **muterole** - установит роль мута на сервере
    **log** - установит канал для логов
    **ideachannel** - установит канал для идей
    **privat** - включит приватные комнаты
    **auto-role** - включит автороль на сервере
    
    **${guild.prefix}modrole \`роль\`** - роль для модерации
    **${guild.prefix}sayrole \`роль\`** - роль для ивентеров
    [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
        `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp()
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "2") {
            let a = "<:on:798173974945202219>";
            let b = "<:on:798173974945202219>";
            let c = "<:on:798173974945202219>";
            let d = "<:on:798173974945202219>";
            let e = "<:on:798173974945202219>";
            let j = "<:on:798173974945202219>";
            let p = "<:on:798173974945202219>";
            let k = "<:on:798173974945202219>";
            if (!guild.vt || guild.vt == "off") a = '<:off:798173944096096256>';
            if (!guild.ec || guild.ec == "off") b = '<:off:798173944096096256>';
            if (!guild.rp || guild.rp == "off") c = '<:off:798173944096096256>';
            if (!guild.rec || guild.rec == "off") d = '<:off:798173944096096256>';
            if (!guild.nsfw || guild.nsfw == "off") e = '<:off:798173944096096256>';
            if (!guild.moz || guild.moz == "off") j = '<:off:798173944096096256>';
            if (!guild.say || guild.say == "off") p = '<:off:798173944096096256>';
            if (!guild.mod || guild.mod == "off") k = '<:off:798173944096096256>';
            let emb = new MessageEmbed()
                .setTitle(`**Настройка сервера**`)
                .setDescription(stripIndents`${guild.prefix}bot \`<аргмуент>\`
    
           **\`\`\`Доступные аргументы:\`\`\`**
    **${a}vt** - второстепенные команды
    **${b}ec**  - включение экономики (нужно указать значок)
    **${c}rp** - модуль рп команд
    **${d}rec** - фильтр ссылок
    **${e}nsfw** - _своеобразный контент_
    **${j}moz** - музыка
    **${k}say** - говорилка
    **${p}mod** - модерация

    [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)

                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "3") {
            let emb = new MessageEmbed()
                .setTitle(`**Настройка входа-выхода**`)
                .setDescription(stripIndents`${guild.prefix}welcome \`<необходимый аргмуент>\`
            **embed** - вид сообщений при входе
            **color** - цвет сообщений
            **footer** - футер сообщений
            **title** - заголовок сообщений
            **image** - ссылка на изображение
            **channel** - установит канал
            **on / off** - включит / выключит
            
            leave \`<необходимый аргмуент>\`
            **embed** - вид сообщений при входе
            **color** - цвет сообщений
            **footer** - футер сообщений
            **title** - заголовок сообщений
            **channel** - установит канал
            **image** - ссылка на изображение

            ***text \`доступный аргумент\`*** - доступно для обоих команд
            **Для welcome:** \`{member}\` - имя и дискриминатор | \`{memberid}\` - id пользователя | \`{membersCount}\` - количество участников | \`{id}\` - айди человека | \`{owner}\` - создатель | \`{username}\` - имя пользователя | \`{guild}\` - название сервера.
            
            **Для leave:** \`{member}\` - пользователь, который зашел | \`{membersCount}\` - количество участников
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp()
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 4) {
            let emb = new MessageEmbed()
                .setTitle(`**Модерация**`)
                .setDescription(stripIndents`
            **addrole \`пользователь\` \`роль\`** - выдать роль 
            **removerole \`пользователь\` \`роль\`** - забрать роль
            **ban \`пользователь\`** - забанить
            **unban \`id\`** - разбанить
            **banid \`id\`** - забанить по id
            **clear \`кол-во сообщений\`** - очистить
            **mute \`пользователь\` \`время\`** - замутить
            **unmute \`пользователь\`** - размутить
            **nick \`пользователь\` \`ник\`** - сменить ник
            **say** - сказать от лица бота
            **sayembed** - сказать от лица бота в эмбеде
            **send \`канал\` \`текст из конструктора\`** - сказать от лица бота, используя конструктор [ссылка](https://mira-bot.ml/embed.html)
            **slowmode \`канал\` \`время\`** - поставит слоумод
            **warn \`пользователь\`** - заварнит человека
            **survey \`кол-во вариантов\` ** - голосование
            **warnsremove \`пользователь\`** - забрать варн
            **/muteinfo \`пользователь\`** - посмотреть информацию о муте пользователя
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp()
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 5) {
            let emb = new MessageEmbed()
                .setTitle(`**Статистика**`)
                .setDescription(stripIndents`
            **${guild.prefix}serverinfo** - информация о сервере
            **${guild.prefix}userinfo** - информация о пользователе
            **${guild.prefix}profile** - профиль
            **${guild.prefix}fortnite** - магазин фортнайта
            **${guild.prefix}botinfo** - информация о боте
            **${guild.prefix}roleinfo** - информация о роли
            **${guild.prefix}info \`id\`** - посмотреть инф. о пользователе
            **${guild.prefix}age** - установить возраст
            **${guild.prefix}bio** - установить био
            **${guild.prefix}rep \`пользователь\`** - дать репутацию
            **${guild.prefix}weather** - посмотреть погоду
            **${guild.prefix}emoji** - посмотреть эмоцию
            **${guild.prefix}cat** - посмотреть кошку
            **${guild.prefix}dog** - посмотреть собаку
            **/ping** - пинг бота
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)`)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 6) {
            let emb = new MessageEmbed()
                .setTitle(`**Roleplay**`)
                .setDescription(stripIndents`
            **/kiss \`@пользователь\`** - поцеловать
            **/hug \`@пользователь\`** - обнять
            **/pat \`@пользователь\`** - погладить
            **/ticke \`@пользователь\`** - тыкнуть
            **/kill \`@пользователь\`** - убить
            **/bite \`@пользователь\`** - пригрозить
            **/highfive\`@пользователь\`** - дать пять
            **/facepawn** - разочароваться
            **/angry** - разозлится
            **/cry** - заплакать
            **/wow** - удивиться
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 7) {
            let emb = new MessageEmbed()
                .setTitle(`**Второстепенное**`)
                .setDescription(stripIndents`
            **${guild.prefix}idea \`текст\`** - отправить идею
            **${guild.prefix}rpc** - камень, ножницы, бумага
            **${guild.prefix}ascii** - написать текст от бота ввиде ascii
            **/avatar** - аватар пользователя
            **/math** - калькулятор
            **/percent** - процент чего-то
            **/ball** - шарик
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 8) {
            let emb = new MessageEmbed()
                .setTitle(`**Премиум <a:premium:941387959985377410>**`)
                .setDescription(stripIndents`
            **Купив премиум вы получите: 
            - Музыку (<:YouTube:847539680806436915> & <:Spotify:847539738487423036>)
            - Многофункциональную экономику
            - Полностью настраемые уровни
            - Дополнительные настройки
            - Хорошо оформленную систему лаврум
            - И многое другое

            <:pushpin_designcore:941561864733741056>\`Цены:\`
          Премиум: 1 месяц - 1$💸 | 3 месяца - 2$💸 | год - 9$💸
          
          Нитро версия(Бот с вашей аватаркой + вашим именем + премиумом)
           1 месяц - 4$💸 | 3 месяца - 7$💸 | год - 18$💸**
            \`\`\`Различные способы оплаты:\`\`\`
**Юмани: 4100116666810369
Сбер: 5228600587420979
Киви:** https://donate.qiwi.com/payin/Mira_bot

***После оплаты обратитесь к владельцу бота***
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
       
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == 9) {
            let emb = new MessageEmbed()
            .setTitle(`**Премиум <a:premium:941387959985377410>**`)
            .setDescription(stripIndents`
            **\`\`\`Способы поддержки проекта:\`\`\`**
**Юмани:** 4100116666810369
**Сбер:** 5228600587420979
**Киви:** https://donate.qiwi.com/payin/Mira_bot
**> При донате есть возможность попросить опубликовать Ваш комментарий на сервере поддержки (нужно попросить разработчика)**

**Мы очень рады, что Вы поддерживаете нас! ❤️**
[Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)

        `)
   
            .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
            .setTimestamp()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "pr_1") {
            let emb = new MessageEmbed()
                .setTitle(`**Уровни**`)
                .setDescription(stripIndents`
            **Для всех пользователей:**
            **/toplevel** - топ по уровням
            **/rank** - просмотр ранг карточки

            **Для администрации:**
            ${guild.prefix}levels \`<необходимый аргмуент>\`
            **resetlevel** - сбросит уровни
            **messagereward** - поставить награду ввиде валюты за сообщения (off - отключит)
            **roledelete** - удалит роль за выбранный Вами уровень
            **role** - поставит роль за выбранный Вами уровень
            **multiplier** - поставит множитель опыта
            **image** - поставит изображение на ранг карточку
            **${guild.prefix}setlevel \`пользователь\`** - установит уровень
            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "pr_2") {
            let emb = new MessageEmbed()
                .setTitle(`**Экономика для администрации**`)
                .setDescription(stripIndents`**${guild.prefix}econom \`необходимый аргумент\`**
            **timely** - поставит значение тимели
            **setcurrency** - сменит валюту
            **add-roulette** - укажет наименьшую и наибольшую ставку
            **add-slots** - укажет наименьшую и наибольшую ставку
            **${guild.prefix}addmoney \`пользователь\` сумма** - забрать / выдать валюту
            **${guild.prefix}economchannels \`канал\`** - установит каналы, где будет доступна экономика
            **${guild.prefix}additem \`цена\` \`сам товар\`** - добавит кастомный товар в магазин
            **${guild.prefix}addroleitem \`роль\` \`цена\`** - добавит роль в магазин
            **${guild.prefix}itemdelete \`role / item\` \`предмет\`** - удалить предмет

            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "pr_3") {
            let emb = new MessageEmbed()
                .setTitle(`**Экономика для всех**`)
                .setDescription(stripIndents`
            **/topmoney** - топ по уровням
            **/bal** - баланс
            **/timely** - тимели
            **/slots** - казино
            **/roulette** - рулетка
            **/shop** - магазин
            **/dice** - кубик
            **/pay** - перевести средства

            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }

        if (page == "pr_5") {
            let emb = new MessageEmbed()
                .setTitle(`**Доп. настройки**`)
                .setDescription(stripIndents`${guild.prefix}guild \`необходимый аргумент\`
            **anti-invite** - фильтр ссылок
            **bot-role** - роль для ботов

            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
        if (page == "pr_4") {
            let emb = new MessageEmbed()
                .setTitle(`**Музыка**`)
                .setDescription(stripIndents`
            **${guild.prefix}play - вкллючить музыку
            ${guild.prefix}stop - завершить просулшивание
            ${guild.prefix}volume - изменить громкость
            ${guild.prefix}pause - поставить на паузу
            ${guild.prefix}resume - возообновить прослушивание
            ${guild.prefix}loop - зацикливание
            ${guild.prefix}skip - пропустить
            ${guild.prefix}fs - быстрый пропуск**

            [Ссылка на сервер поддержки](https://discord.gg/Xums8Xd)
            `)
                .setFooter({ text: `Страница: ${interaction.values[0].match(/\d+/)[0]}` })
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            interaction.update({ content: " ", embeds: [emb], ephemeral: true })
        }
    }
    if (interaction.isButton()) {

        //await interaction.deferReply({ephemeral:true}).catch(() => {});
        if (interaction.customId == "buy1" || interaction.customId == "buy2" || interaction.customId == "buy3") {
            let guild = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
            let con = interaction.message.content;
            let page = 1;
            if (con) page = con.match(/\d+/)[0];
            let shop = await Shop.findOne({ id: interaction.guild.id }) || new Shop({ id: interaction.guild.id });
            if (interaction.customId == "buy2") {

                page++;
                if (page > 3) {
                    return interaction.reply({
                        content: `**Вы дошли до пределов магазина!**`,
                        ephemeral: true
                    });
                }
                if (page == 2) {
                    let p = 1;
                    let txt = " ";
                    if (shop.items == null || shop.items == []) txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    if (shop.items != null) for (var i = 0; i < shop.items.length; i++) {
                        txt += `[#${p++}] ${shop.items[i]} - \`${shop.items_pr[i]}\` ${guild.val}\n`
                    }
                    if (txt == " ") txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    let emb = new MessageEmbed()
                        .setDescription(stripIndents`**${txt}**`)
                        .setTitle("Магазин")
                        .setTitle(`**Предметы**`)
                        .setColor("GREEN")
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

                    interaction.update({ content: `Страница: ${page}`, embeds: [emb], ephemeral: true })
                }
                if (page == 3) {
                    let txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    if (guild.dop_item2 && !guild.dop_item1) txt = `**[1] Love rooms - \`${guild.dop_item2}\` ${guild.val}**`
                    if (guild.dop_item1 && !guild.dop_item2) txt = `**[1] Личная роль - \`${guild.dop_item1}\` ${guild.val}**`
                    if (guild.dop_item1 && guild.dop_item2) txt = `**[1] Личная роль - \`${guild.dop_item2}\` ${guild.val}\n[2] Love rooms - \`${guild.dop_item1}\` ${guild.val}**`
                    let emb = new MessageEmbed()
                        .setDescription(stripIndents`${txt}`)
                        .setTitle("Магазин")
                        .setTitle(`**Уникальные предметы**`)
                        .setColor("GREEN")
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    interaction.update({ content: `Страница: ${page}`, embeds: [emb] })
                }
            }
            if (interaction.customId == "buy1") {
                page--;
                if (page < 1) {
                    return interaction.reply({
                        content: `**Вы дошли до пределов магазина!**`,
                        ephemeral: true
                    });
                }
                if (page == 2) {
                    let p = 1;
                    let txt = " ";

                    if (!shop.items || shop.items == []) txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    if (shop.items != null) for (var i = 0; i < shop.items.length; i++) {

                        txt += `[#${p++}] ${shop.items[i]} - \`${shop.items_pr[i]}\` ${guild.val}\n`
                    }
                    if (txt == " ") txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    let emb = new MessageEmbed()
                        .setDescription(stripIndents`**${txt}**`)
                        .setTitle("Магазин")
                        .setTitle(`**Предметы**`)
                        .setColor("GREEN")
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    interaction.update({ content: `Страница: ${page}`, embeds: [emb] })
                }
                if (page == 1) {
                    let p = 1;
                    let txt = " ";
                    if (!shop.roles || shop.roles == []) txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    if (shop.roles) for (var i = 0; i < shop.roles.length; i++) {
                        txt += `[#${p++}] <@&${shop.roles[i]}> - \`${shop.roles_pr[i]}\` ${guild.val}\n`
                    }
                    if (txt == " ") txt = "На данный момент предметов в магазине нет <a:Loading:941211075213393971>";
                    let emb = new MessageEmbed()
                        .setTitle("Магазин")
                        .setTitle(`**Роли**`)
                        .setColor("GREEN")
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setDescription(stripIndents`**${txt}**`)
                    interaction.update({ content: `Страница: ${page}`, embeds: [emb] })
                }

            }
        }
        if (interaction.customId == "buy3") {
            interaction.reply({
                content: `**Укажите: номер страницы и номер предмета!**`,
                ephemeral: true
            });
            let shop = await Shop.findOne({ id: interaction.guild.id }) || new Shop({ id: interaction.guild.id });
            let user = await User.findOne({ userID: interaction.user.id, guild: interaction.guild.id }) || new User({ userID: interaction.user.id, guild: interaction.guild.id });
            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = interaction.channel.createMessageCollector({ filter, max: 1, time: 180000 });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            col1.on("collect", async (m) => {
                let a = m.content.split(' ')[0];
                let b = m.content.split(' ')[1];
                let emb = new MessageEmbed()
                    .setDescription(stripIndents`Укажите \`корректные\` данные!`)
                    .setColor("RED")
                    .setTitle("**Ошибка ❌**")

                if (!b && !a) return interaction.followUp({ embeds: [emb], ephemeral: true });
                let embeds = new MessageEmbed()
                    .setDescription(stripIndents`Произошел сбой при покупке предмета!`)
                    .setColor("RED")
                    .setTitle("**Ошибка ❌**")

                if (!b && !a) return interaction.followUp({ embeds: [emb], ephemeral: true });
                if (isNaN(a) == true || isNaN(b) == true) return interaction.followUp({
                    embeds: [emb],
                    ephemeral: true
                });
                if (a > 3) return interaction.followUp({
                    embeds: [emb],
                    ephemeral: true
                });
                if (a == 1) {
                    let role = shop.roles[b - 1];
                    let sum = shop.roles_pr[b - 1];
                    if (!role) return interaction.followUp({
                        embeds: [embeds],
                        ephemeral: true
                    });
                    if (user.withmoney < sum) {
                        let embed = new MessageEmbed()
                            .setDescription(stripIndents`У Вас нехватка средств, необходимая сумма: \`${sum}\`!`)
                            .setColor("RED")
                            .setTitle("**Ошибка ❌**")
                        return interaction.followUp({ embeds: [embed], ephemeral: true });
                    }
                    role = interaction.guild.roles.cache.get(role);
                    if (!role) return interaction.followUp({ content: "Упс... на сервере нет роли!", ephemeral: true });

                    member.roles.add(role.id);
                    user.withmoney -= sum;
                    user.save()
                    let embed = new MessageEmbed()
                        .setDescription(stripIndents`**Вам была выдана роль: \`${role.name}\`**!`)
                        .setColor("GREEN")
                        .setTitle("**Успех ✅**")
                    return interaction.followUp({ embeds: [embed], ephemeral: true });
                }
                if (a == 2) {
                    let sum = shop.items_pr[b - 1];
                    let item = shop.items[b - 1];
                    if (!item) return interaction.followUp({
                        embeds: [emb],
                        ephemeral: true
                    });
                    if (user.withmoney < sum) {
                        let embed = new MessageEmbed()
                            .setDescription(stripIndents`У Вас нехватка средств, необходимая сумма: \`${sum}\`!`)
                            .setColor("RED")
                            .setTitle("**Ошибка ❌**")
                        return interaction.followUp({ embeds: [embed], ephemeral: true });
                    }
                    user.withmoney -= sum;
                    user.save()
                    let embed = new MessageEmbed()
                        .setDescription(stripIndents`**Вы успешно приобрели ${item}!**`)
                        .setColor("GREEN")
                        .setTitle("**Успех ✅**")
                    return interaction.followUp({ embeds: [embed], ephemeral: true });
                }


                if (a == 3) {
                    let emb = new MessageEmbed()
                        .setDescription(stripIndents`Укажите \`корректные\` данные!`)
                        .setColor("RED")
                        .setTitle("**Ошибка ❌**")
                    let it = b;
                    if (!guild.dop_item1 && guild.dop_item2) it = 2;
                    if ((it == 1 && !guild.dop_item1 && !guild.dop_item2) || (it == 2 && !guild.dop_item2 && !guild.dop_item2) || b > 2) return interaction.followUp({
                        embeds: [emb],
                        ephemeral: true
                    });
                    if (!guild.dop_item1 && !guild.dop_item2) return interaction.followUp({
                        embeds: [emb],
                        ephemeral: true
                    });
                    if (user.vip_id != null) {
                        return interaction.followUp({
                            content: "**У Вас уже есть личная роль!**"
                        })
                    }
                    if (it == 1) {
                        let sum = guild.dop_item1;
                        let embed = new MessageEmbed()
                            .setDescription(stripIndents`У Вас нехватка средств, необходимая сумма: \`${sum}\`!`)
                            .setColor("RED")
                            .setTitle("**Ошибка ❌**")
                        if (user.withmoney < sum) return interaction.followUp({ embeds: [embed], ephemeral: true });
                        interaction.followUp({ content: "**Укажите цвет, а потом название роли!**\n> **Доступные цвета:** красный | зеленый | черный | белый | желтый | синий | фиолетовый | розовый | \`координаты цвета\`", ephemeral: true });
                        const fil = (message) => message.author.id === interaction.user.id;
                        var col = interaction.channel.createMessageCollector({ filter: fil, max: 1, time: 180000 });
                        col.on("collect", async (m) => {
                            if (!m.content.split(' ')[0]) return interaction.followUp({ content: "Вы не указали цвет!", ephemeral: true });
                            let c;
                            c = m.content.split(' ')[0];
                            let str = c;
                            let name = m.content.split(' ')[1];
                            if (!name) return interaction.followUp({ content: "Вы не указали название роли!", ephemeral: true });
                            if (!m.content.match(/#?([0-9a-fA-F]{6})/) && (c != "белый" && c != "красный" && c != "синий" && c != "черный" && c != "желтый" && c != "зеленый" && c != "фиолетовый" && c != "розовый")) return interaction.reply({ content: "Вы не указали \`реальный\` цвет!", ephemeral: true });
                            if (c == "белый") str = "#FFFFFF";
                            if (c == "красный") str = "#FF0000";
                            if (c == "синий") str = "#0000ff";
                            if (c == "черный") str = "#000000";
                            if (c == "желтый") str = "#ffff00"
                            if (c == "зеленый") str = "#008000"
                            if (c == "фиолетовый") str = "#8b00ff";
                            if (c == "розовый") str = '#ff8fa2';
                            let role = await interaction.guild.roles.create({
                                name: name,
                                color: str,
                            })
                            member.roles.add(role.id);
                            user.vip_id = role.id;
                            user.vip_name = name;
                            user.withmoney -= sum;
                            user.save()
                            return interaction.followUp({ content: "Вы купили личную роль", ephemeral: true });
                        });

                    }
                    if (it == 2) {

                        let sum = guild.dop_item2;
                        if (!user.marry) return interaction.followUp({ content: "У Вас нет пары! :(", ephemeral: true });
                        let marry = await Marry.findOne({ id: interaction.guild.id, users: interaction.user.id });

                        if (!marry) return interaction.followUp({ content: "У Вас нет пары! :(", ephemeral: true });
                        if (marry.bal == true) return interaction.followUp({ content: "У Вас уже есть своя лав-рума!", ephemeral: true });
                        if (marry.bal < sum) return interaction.followUp({ content: "У Вашей пары нехватка баланса!", ephemeral: true });
                        let parent;
                        if (!guild.marry_parent) parent = await interaction.guild.channels.create("[💞] Love rooms", {
                            type: "GUILD_CATEGORY",
                        })
                        if (guild.marry_parent) parent = interaction.guild.channels.cache.get(guild.marry_parent);
                        if (!guild.marry_parent) guild.marry_parent = parent.id, guild.save();
                        let user1 = interaction.guild.members.cache.get(marry.user_1);
                        let user2 = interaction.guild.members.cache.get(marry.user_2);
                        let ch = await interaction.guild.channels.create(`${user1.user.username} 💗 ${user2.user.username}`,
                            {
                                type: "GUILD_VOICE",
                                parent: parent,
                                reason: "love room",
                                permissionOverwrites: [
                                    {
                                        id: interaction.guild.id,
                                        allow: ['VIEW_CHANNEL'],
                                        deny: ["CONNECT", "SPEAK"],
                                    },
                                    {
                                        id: user1.id,
                                        allow: ['VIEW_CHANNEL', "CONNECT", "SPEAK"],
                                    },
                                    {
                                        id: user2.id,
                                        allow: ['VIEW_CHANNEL', "CONNECT", "SPEAK"],
                                    },
                                ],
                            })

                        marry.bal -= sum;
                        marry.ch = ch.id;
                        let timestamp = new Date().getTime();
                        let mutedUntil = new Date();
                        mutedUntil.setTime(timestamp + ms("30d"));
                        marry.date = mutedUntil;
                        marry.bol = true;
                        marry.save()
                        interaction.followUp({ content: "Вы успешно приобрели товар!" })
                    }
                }
            });
        }
    }
    if (interaction.isButton()) {

        let id = interaction.customId;
        //await interaction.deferReply({ephemeral:false}).catch(() => {});
        const guild = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id });
        if (id == "voice__1" || id == "voice__2" || id == "voice__3"|| id == "voice__4"|| id == "voice__5"|| id == "voice__6"|| id == "voice__7")
            {
                var t = new Date();
               let today =  t.setSeconds(t.getSeconds() + 15);
            client.privat_rooms.set(interaction.user.id + interaction.guild.id,{value:"+",date:today});      
            }
        if (interaction.isButton() && interaction.customId == "voice__2") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });

            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;

            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            }
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите лимит! **`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (msg) => msg.member.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {

                if (isNaN(m.content) == true) return interaction.followUp({ content: "укажите реальный лимит!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                let sum = Number(m.content);
                if (sum < 0 || sum > 99) return interaction.followUp({ content: "укажите реальный лимит!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                m.delete().catch(() => { });
                let ch = member.voice.channel;
                if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                ch.setUserLimit(sum);
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
        }
        if (interaction.isButton() && interaction.customId == "voice__4") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;
            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите пользователя, которого хотите выгнать из войса! **`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                let me = m.content.replace(/[^0-9]/g, "")
                m.delete().catch(() => { });
                let mem = interaction.guild.members.cache.get(me);
                if (!mem) return interaction.followUp({ content: `<@${interaction.user.id}, укажите реального пользователя!` }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });


                if (!mem.voice.channel) return interaction.followUp({ embeds: [{ color: "#d30d27", description: `**<@${member.id}>, пользователь не в войсе!**` }] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                let cz = mem.voice.channel;
                if (cz.parentId !== guild.parent) return interaction.followUp({ content: "пользователь не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                if (mem.voice.channelId != member.voice.channelId) return interaction.followUp({ content: "пользователь не в твоем канале!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });

                mem.voice.disconnect();
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
            col1.on("end", async () => {
            })
        }


        if (interaction.isButton() && interaction.customId == "voice__1") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;

            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите название!**`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", (m) => {
                m.delete().catch(() => { });
                if (m.content.length > 32) return interaction.followUp({ content: "укажите лимит до 32 символов!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
                ch.setName(m.content);
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
            col1.on("end", async () => {

            })
        }
        if (interaction.isButton() && interaction.customId == "voice__7") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;
            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите пользователя, которому хотите передать права! **`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", (m) => {
                let me = m.content.replace(/[^0-9]/g, "")
                m.delete().catch(() => { });
                let mem = interaction.guild.members.cache.get(me);
                if (!mem) return interaction.followUp({ content: `<@${interaction.user.id}, укажите реального пользователя!` }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });


                let ch = member.voice.channel;
                ch.permissionOverwrites.edit(mem,
                    {

                        VIEW_CHANNEL: true,
                        MANAGE_CHANNELS: true,
                        MOVE_MEMBERS: true
                    }
                );

                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
            col1.on("end", async () => {

            })
        }
        if (interaction.isButton() && interaction.customId == "voice__6") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;
            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите пользователя, которого хотите заблокировать!**`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)
            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", (m) => {
                let me = m.content.replace(/[^0-9]/g, "")
                m.delete().catch(() => { });
                let mem = interaction.guild.members.cache.get(me);

                if (!mem) return interaction.followUp({ content: `<@${interaction.user.id}, укажите реального пользователя!` }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });

                ch.permissionOverwrites.edit(mem,
                    {

                        VIEW_CHANNEL: false,
                        CONNECT: false
                    }
                );
                mem.voice.disconnect();
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
            col1.on("end", async () => {

            })

        }
        if (interaction.isButton() && interaction.customId == "voice__5") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;
            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите пользователя, которому хотите отключить микрофон! **`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = await interaction.channel.createMessageCollector({ filter, max: 1, time: 15000 });
            col1.on("collect", async (m) => {
                let me = m.content.replace(/[^0-9]/g, "")
                m.delete().catch(() => { });
                let mem = interaction.guild.members.cache.get(me);
                if (!mem) return interaction.followUp({ content: `<@${interaction.user.id}, укажите реального пользователя!` }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });

                if (!mem.voice.channel) return interaction.followUp({ content: `<@${interaction.user.id}, пользователь не в войсе!` }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });

                mem.voice.disconnect();
                ch.permissionOverwrites.edit(mem,
                    {

                        SPEAK: false
                    }
                );
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**✅ Успешно!**`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            })
            col1.on("end", async () => {

            })
        }
        if (interaction.isButton() && interaction.customId == "voice__3") {
            interaction.reply({
                content: `**Действие в процессе обработки...**`,
                ephemeral: true
            });
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (member.user.bot) return;
            if (!member.voice.channelId) {
                let a = new MessageEmbed()
                    .setColor("#d30d27")
                    .setDescription(stripIndents`**<@${member.id}>, зайдите в канал!**`)
                setTimeout(() => interaction.followUp({ embeds: [a] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { }), 1000)
                return;
            };
            let ch = member.voice.channel;
            if (ch.parentId != guild.parent) return interaction.followUp({ content: "вы не в той категории!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            if (!ch.permissionOverwrites.cache.get(member.id) || (!ch.permissionsFor(member.id) || !ch.permissionsFor(member.id).has("MANAGE_CHANNELS"))) return interaction.followUp({ content: "этот канал не принадлежит тебе!" }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000)).catch(() => { });
            let emb = new MessageEmbed()
                .setColor("2bda0f")
                .setDescription(stripIndents`**<@${member.id}>, укажите пользователя, которого хотите пригласить в канал! **`)
                .setTimestamp()
            setTimeout(() => interaction.followUp({ embeds: [emb] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 15000)).catch(() => { }), 1000)

            const filter = (message) => message.author.id === interaction.user.id;
            var col1 = interaction.channel.createMessageCollector({ filter, max: 1, time: 30000 });
            col1.on("collect", async (m) => {
                let me = m.content.replace(/[^0-9]/g, "")
                let mem = interaction.guild.members.cache.get(me);
                m.delete().catch(() => { });
                if (!mem) try {
                    const msg = await interaction.followUp({ content: `<@${interaction.user.id}, укажите реального пользователя!` });
                    return setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 5000);
                } catch { }
                let ch = member.voice.channel;
                interaction.followUp(`<@${mem.id}>, комната - <#${ch.id}>`).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 30000)).catch(() => { });
                let embs = new MessageEmbed()
                    .setColor("2bda0f")
                    .setDescription(stripIndents`**Пользователь <@${member.id}> приглашает Вас в свою комнату! **`)
                    .setTimestamp()
                interaction.followUp({ embeds: [embs] }).then(msg => setTimeout(() =>{if (msg) msg.delete().catch(() => { })}, 30000)).catch(() => { });


            })
            col1.on("end", async () => {

            });
        }
        if (interaction.isButton()) { 
            if (interaction.customId != "music_1" && interaction.customId != "music_2"  && interaction.customId != "music_3"  && interaction.customId != "music_4"  && interaction.customId != "music_5"  && interaction.customId != "music_6" ) return;
            await interaction.deferReply({ ephemeral: true});
            let guild = await Guild.findOne({id:interaction.guild.id}) || new Guild({id:interaction.guild.id})
            let member = interaction.guild.members.cache.get(interaction.user.id);
            let q = client.queue.get(interaction.guild.id);
            if(!q || q.voice != member.voice.channel) return interaction.followUp({embeds: [{color: "RED", title:"Ошибка ❌",description: `**<@${interaction.user.id}>, Вы не находитесь в войсе со мной! <a:IconVoiceStageOpen:941556587909242890>**`,ephemeral:true}]})
           if(interaction.customId == "music_1") {interaction.followUp({content:"Укажите **необходимую громкость**!",ephemeral:true})
            const filter = (message) => message.author.id === interaction.user.id;
            var col = interaction.channel.createMessageCollector({ filter, max: 1, time: 30000 });
              col.on("collect", async (m) => {
                if (isNaN(m.content) == true) return interaction.followUp({embeds: [{color: "RED", title:"Ошибка ❌",description: `**<@${interaction.user.id}>, Укажите громкость! (от 1 до 100)**`,ephemeral:true}]});
                if (Number(m.content) > 100 || Number(m.content) < 1)return interaction.followUp({embeds: [{color: "RED", title:"Ошибка ❌",description: `**<@${interaction.user.id}>, Укажите громкость \`от 1 до 100\`!**`,ephemeral:true}]});
                guild.volume = Number(m.content);
                guild.save();
                q.player.volume(Number(m.content));
                console.log(Number(m.content));
                let emb = new MessageEmbed()
                .setDescription(stripIndents `<@${member.id}> Вы успешно поменяли громкость!`)
                .setTitle(`**Успешно ✅**`)
                .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
                return interaction.followUp({embeds:[emb]});

            })
        }
        ///
        if(interaction.customId == "music_2") {

            
            client.skip(interaction.guild);
    
            let emb = new MessageEmbed()
            .setDescription(stripIndents `**<@${member.id}> Вы успешно пропустили трек!**`)
            .setTitle(`**Успешно ✅**`)
            .setColor("GREEN")
            .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
         return    interaction.followUp({embeds:[emb]});
        
      
    }
    ///
        if(interaction.customId == "music_3") {
            if (q.pause == true) interaction.followUp({embeds: [{color: "RED", title:"Ошибка ❌",description: `**<@${interaction.user.id}>, Трек уже стоит на паузе!**`,ephemeral:true}]})
            q.pause = true;
            q.player.pause(true);
            let emb = new MessageEmbed()
            .setDescription(stripIndents `**<@${member.id}> Вы успешно поставили трек на паузу!**`)
            .setTitle(`**Успешно ✅**`)
            .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
            return interaction.followUp({embeds:[emb]});

    }
    if(interaction.customId == "music_4") {
        if (q.pause == false) interaction.followUp({embeds: [{color: "RED", title:"Ошибка ❌",description: `**<@${interaction.user.id}>, Трек не стоит на паузе!**`,ephemeral:true}]})
        q.pause = false;
        q.player.pause(false);
        let emb = new MessageEmbed()
        .setDescription(stripIndents `**<@${member.id}> Вы успешно поставили трек на паузу!**`)
        .setTitle(`**Успешно ✅**`)
        .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
        return interaction.followUp({embeds:[emb]});

}
if(interaction.customId == "music_5") {

    if (q.loop == false) q.loop = true;
    else {
        q.loop = false;
    }
    let emb = new MessageEmbed()
    .setDescription(stripIndents `**<@${member.id}> Вы успешно поставили трек на зацикливание!**`)
    .setTitle(`**Успешно ✅**`)
    .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
    return interaction.followUp({embeds:[emb]});

}
if(interaction.customId == "music_6") {
    client.queue.delete(interaction.guild.id);
    await q.player.destroy();
    client.manager.leave(interaction.guild.id);
    let emb = new MessageEmbed()
    .setDescription(stripIndents `**<@${member.id}> Вы успешно отключили бота из канала!**`) 
    .setTitle(`**Успешно ✅**`)
    .setFooter({text:`${interaction.user.username}`,iconURL:interaction.user.avatarURL({dynamic:true})})
    return interaction.followUp({embeds:[emb]});

}
if(interaction.customId == "music_7") {
    async function format(t) {
        let min = Math.floor(t / 60);
        let sec = t % 60;
        return `${min} мин. ${sec} сек.`;
      }
      
      async function page(message, m, pages) {
        var index = 0;
        const filter = (r, user) =>
          (r.emoji.name == "⬅️" || r.emoji.name == "➡️") &&
          user.id == message.member.id;
        var col = await m.createReactionCollector(filter, { time: 120000 });
      
        col.on("collect", (r) => {
          if (r.emoji.name == "⬅️" && pages[index - 1]) {
            m.edit({ embed: pages[index - 1] });
            index -= 1;
          }
          if (r.emoji.name == "➡️" && pages[index + 1]) {
            m.edit({ embed: pages[index + 1] });
            index += 1;
          }
          m.reactions.cache.forEach((e) => e.users.remove(message.author.id));
        });
      
        col.on("end", () => {
          m.reactions.removeAll().catch(() => { });
        });
      }
    var download = new MessageEmbed()
    .setDescription("**Подождите , происходит загрузка <a:__:766320104295235585>**")
   
    .setColor("RANDOM")
    .setTimestamp(Date.now())
    .setFooter({text:
      `${interaction.user.displayName}`,iconURL:
      interaction.user.displayAvatarURL({dynamic:true})}
    );
  message.channel.send({ embeds: [download] }).then(async (m) => {

  let y = 1;
  if (q.songs.length <= 5) {
    let embed = new MessageEmbed()
      .setTitle("Очередь")
      .setDescription(
        q.songs.map(
          (x) =>
            `**${y++}.** [${x.name}](${x.url}) (${x.author}) - ${
              x.stream ? "Прямой эфир" : x.time
            } | ${x.member}`
        )
      )
      .setColor("RANDOM")
      .setFooter({text:
        `${interaction.user.displayName}`,iconURL:
        interaction.user.displayAvatarURL({dynamic:true})}
      );

    return m.edit({ embeds: [embed] }).catch(() => { })
  }
  let p = [];
  let text = ``;
  let l = 1;
  let songs = q.songs;
  let lists = Math.ceil(songs.length / 5);
  for (let i = 0; l <= lists; i += 5) {
    let embed = new MessageEmbed()
      .setTitle("Очередь")
      .setDescription(
        songs
          .slice(i, i + 5)
          .map(
            (x) =>
              `**${y++}.** [${x.name}](${x.url}) (${x.author}) - ${
                x.stream ? "Прямой эфир" : x.time
              } | ${x.member}`
          )
      )
   
      .setColor("RANDOM")
      .setFooter({
        text: `${interaction.user.displayName}` + " | Страница " + l + "/" + lists,iconURL:  message.author.displayAvatarURL({ dynamic: true })
       });

    p.push(embed);
    if (l == lists) {
      m.edit(p[0]).catch(() => {});
      setTimeout(() => { m.react('⬅️')}, 1000);
      setTimeout(() => {m.react('➡️')}, 2000);

      page(message, m, p);
    }

    l++;
  
  }
  })
}
        }
    }
    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});