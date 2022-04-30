// const ytdl = require("ytdl-core");
// async function getToken() {
//   // URL to retrieve an access token.
//   const spotify_url = "https://accounts.spotify.com/api/token";
// const {stripIndents, stripIndent} = require("common-tags")
//   // Send authorization code to spotify.
//   const response = await axios({
//     method: "post",
//     url: spotify_url,
//     params: {
//       grant_type: "refresh_token",
//       refresh_token: "AQCmcBidC5KPA3Zn8FXKCHtsnSqQjSaTeM3tde6BVfXtmcbCP7RxduSXw0b-mleY4NToDAgBmI3p5-9YE78Sy19cRZCN7MsUq93WM9L0_sJMije7S8_bHv9VEcM6lvZD-AQ",
//     },
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " + Buffer.from("36bad0b91b224d00a5eea058854fd39e" + ":" + "c0ea8902f2574a9296a614147e40fbb6").toString("base64"),
//     },
//   }).catch((e) => console.log(e.response.data));
//   let access_token = response.data.access_token;

//   return access_token;
// }
//   const { MessageEmbed } = require("discord.js");
// const { Rest } = require("lavacord");

// const Cooldowns = new Map();
// const Guild = require('../../guild.js');
// var Cooldown = 6000;

// const axios = require("axios");
// async function add(song, q, client, message) {
//   q = q || client.queue.get(message.guild.id);

//   if (!q) return message.reply("произошла ошибка связанная с сервером!");
//   q.songs.push(song);
// }
// async function create(message, song, client) {
//   try {
//     const player = await client.manager
//       .join(
//         {
//           channel: message.member.voice.channel.id,
//           guild: message.guild.id,
//           node: "1",
//         },
//         {
//           selfdeaf: true,
//         }
//       )
//       .catch((e) => {
//         let es = new MessageEmbed()
//   .setColor('#9211cb')
//   .setDescription('Произошла ошибка!')
//   message.channel.send({embeds:[es]});
//         client.manager
//           .connect()
//           .then(() => console.log("Сервер успешно подключен!"));
//         console.log(e);
//       });
//     let map = {
//       text: message.channel,
//       voice: message.member.voice.channel,
//       player: player,
//       songs: [song],
//       playing: true,
//       loop: false,
//       loopQ: false,
//       bassboost: 0,
//     };
//     if (!player) return;
//     client.queue.set(message.guild.id, map);
//     client.play(song, message.guild);
//   } catch (error) {
//     console.log(error);
//     message.channel.send("Ошибка!");
//     client.manager.leave(message.guild.id);
//   }
// }

// async function getSong(track, client) {
// const node = client.manager.nodes.get("1");
// const result = await Rest.load(node, track);
// if (!result) return;
// return result;
// }



// async function format(t) {
// let min = Math.floor(t / 60);
// let sec = t % 60;
// return `${min} мин. ${sec} сек.`;
// };

module.exports = {
  name: "play",
  aliases: ['play'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    return message.reply("переведите бота на слеш-команды!");
  }
}
  //   var down = Cooldowns.get(message.member.id) || { times: 0, time: 0 };
  
  //   if (down.time + Cooldown > Date.now()){ 
  //  down.times++;
  //  if (down.times == 2) return message.reply('эй! Ты слишком часто используешь команду!');
  //  if (down.times == 3) return message.reply('🕗');
  //  if (down.times > 3) return;
  
  // return;
  // }
  
  // Cooldowns.set(message.member.id, { id: message.member.id, times: 0,  time: Date.now() });
  
  
  // let q = client.queue.get(message.guild.id);
  //   const embc = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id });
  
  //   let vovapidor = new MessageEmbed()
  //   .setAuthor(`❌ Ошибка`)
  //   .setDescription(`${message.author}, Вы не находитесь в голосовом канале!<:voice:760576319473320018>`)
  //   .setColor("#d30d27")
  //   if (!message.member.voice || !message.member.voice.channel) return message.channel.send({embeds:[vovapidor]}).catch(() => {});
  
   
  //   let allrife = new MessageEmbed()
  //   .setAuthor(`❌ Ошибка`)
  //   .setDescription(`${message.author}, похоже я нахожусь в другом канале!<:voice:760576319473320018>`)
  //   .setColor("#d30d27")
  //   if (q && message.guild.me.voice.channel && message.guild.me.voice.channel != message.member.voice.channel) return message.channel.send({embeds:[allrife]}).catch(() => {});
   
  
  //     let ems = new MessageEmbed()
  //     .setAuthor(`❌ Ошибка`)
  //     .setDescription(`${message.author}, Вы забыли написать название композиции!`)
  //     .setColor("#d30d27")
  //   if (!args[0]) return message.channel.send({embeds:[ems]}).catch(() => {});
  //   if (message.content.includes("https://open.spotify.com/")) {
  // const spoty = args[0].replace("https://open.spotify.com/", "").split("/");
  
  // spoty[1] = spoty[1].split("?")[0];
  // if (args[0].startsWith("https://open.spotify.com/") && spoty.length == 2) {
    
  //   let token = await getToken();
  //   let auth = "Bearer " + token;
  //   options = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: auth,
  //     },
  //   };
  //   if (!["track", "playlist", "album"].includes(spoty[0]))
  //     return message.reply("что-то пошло не так!");
  
  //   spoty[0] += "s";
  
  //   let play = await axios(
  //     `https://api.spotify.com/v1/${spoty[0]}/${spoty[1]}`,
  //     options
  //   ).catch((e) => console.log(e.response.data));
  
  //   let serGeyss = new MessageEmbed()
  //   .setAuthor(`❌ Ошибка`)
  //   .setDescription(`${message.author}, к сожалению мне не удалось найти песню!`)
  //   .setColor("#d30d27")
  //   .setTimestamp()
  //   if (!play) return message.channel.send({embeds:[serGeyss]}).catch(() => {});
  
  //   play = play.data;
  //   if (!play.tracks) {
  //     let song = await getSong(
  //       `ytsearch: ${play.name} ${play.artists[0] ? play.artists[0].name : ""}`,
  //       client
  //     );
  //     song = song.tracks[0];
  //     let serGeysss = new MessageEmbed()
  //     .setAuthor(`❌ Ошибка`)
  //     .setDescription(`${message.author}, к сожалению мне не удалось найти песню!`)
  //     .setColor("#d30d27")
  //     .setTimestamp()
  //     if (!song) return message.channel.send({embeds:[serGeysss]}).catch(() => {});
  
  //     let ss = new MessageEmbed()
  //     .setAuthor(`❌ Ошибка`)
  //     .setDescription(`${message.author}, укажи трек длительностью меньше, чем 4 часа!`)
  //     .setColor("#d30d27")
  //     .setTimestamp()
  //     if (!song.info.isStream && song.info.length / 1000 > 14400) return message.channel.send({embeds:[ss]}).catch(() => {});
    
  //     let s = {
  //       track: song.track,
  //       name: song.info.title,
  //       stream: song.info.isStream,
  //       author: song.info.author,
  //       time: await format(song.info.length / 1000),
  //       url: song.info.uri,
  //       member: message.member,
  //     };
  //     let embed = new MessageEmbed()
  //       .setTitle(s.name)
  //       .setURL(s.url)
  //     .setColor(embc.emb)
  //       .addField("Длительность", s.stream ? "Прямая трансляция" : s.time)
  //       .setDescription(stripIndents `Автор: **${s.author}
  //   Длительность: **${s.stream ? "Прямой эфир" : s.time}**
  //   Канал: **${message.channel.name}`)
  //  .setThumbnail('https://cdn.discordapp.com/attachments/782199661766246411/943186420900696074/lovemusic50.png')
  //   .setTimestamp()
  //   .setFooter(message.author.username)
  // message.channel.send({ embeds:[ embed] }).catch(() => {});
  //     message.channel.send({ embeds:[ embed ]});
  //     if (!q) {
  //       create(message, s, client);
  //     } else {
  //       add(s, q, client, message);
  //     }
  //   } else if (spoty[1] == "albums") {
  //     if (play.tracks.items.length == 0) return message.channel.send("Этот альбом пустой");
  //     let embed = new MessageEmbed()
  //       .setTitle(play.name)
  //       .setDescription(`${message.author}, Вы успешно добавили \`${play.tracks.items.length}\` песен в очередь!`)
  //       .setTimestamp()
       
       
  //     message.channel.send({ embeds:[ embed]});
  //     let bool = q ? false : true;
  //     play.tracks.items.forEach(async (track) => {
  //       q = client.queue.get(message.guild.id);
  //       let song = await getSong(
  //         `ytsearch: ${track.name} ${
  //           track.artists[0] ? track.artists[0].name : ""
  //         }`,
  //         client
  //       );
  //       song = song.tracks[0];
  //       if (!song) return;
  //       if (!song.info.isStream && song.info.length / 1000 > 14400) return;
  //       let s = {
  //         track: song.track,
  //         name: song.info.title,
  //         stream: song.info.isStream,
  //         author: song.info.author,
  //         time: await format(song.info.length / 1000),
  //         url: song.info.uri,
  //         member: message.member,
  //       };
  //       if (bool) {
  //         create(message, s, client);
  //         bool = false;
  //       } else {
  //         add(s, q, client, message);
  //       }
  //     });
  //   } else {
  //   let es = new MessageEmbed()
  //   .setAuthor(`❌ Ошибка`)
  //   .setDescription(`${message.author}, в этом альбоме ничего нет!`)
  //   .setColor(embc.emb)
  //   .setTimestamp()
  //   if (play.tracks.items.length == 0) return message.channel.send(es);
      
  //   let embed = new MessageEmbed()
  //   .setTitle(play.name)
  //   .setDescription(`${message.author}, Вы успешно добавили \`${play.tracks.items.length}\` песен в очередь!`)
  //   .setColor(embc.emb)
  //   .setTimestamp()
   
   
  // message.channel.send({ embeds:[ embed] });
  
  //     let bool = q ? false : true;
  //     play.tracks.items.forEach(async (track) => {
  //       q = client.queue.get(message.guild.id);
  //       let song = await getSong(
  //         `ytsearch: ${track.track.name} ${
  //           track.track.artists[0] ? track.track.artists[0].name : ""
  //         }`,
  //         client
  //       );
  //       song = song.tracks[0];
  //       if (!song) return;
  //       if (!song.info.isStream && song.info.length / 1000 > 14400) return;
  //       let s = {
  //         track: song.track,
  //         name: song.info.title,
  //         stream: song.info.isStream,
  //         author: song.info.author,
  //         time: await format(song.info.length / 1000),
  //         url: song.info.uri,
  //         member: message.member,
  //       };
  //       if (bool) {
  //         create(message, s, client);
  //         bool = false;
  //       } else {
  //         add(s, q, client, message);
  //       }
  //     });
  //   }
  //   return;
  // }
  // }
  // else {
  //   var search = require("youtube-search");
  //   const yts = require("yt-search");
  //   let res_one = await yts(args.join(" "));
  
  //     const track = args.join(" ");
  //    if(!track) return message.reply('что-то пошло не так, попробуйте еще раз');
  //   if (!/https?:\/\/[^ /.]+\.[^ /.]+/g.test(args[0])) {
  //     let song = await getSong(`ytsearch: ${track}`, client);
     
      
  //     if (!song) return message.reply('попробуйте еще раз!');
  //     if (!song.tracks) return message.reply('попробуйте еще раз!');
  //     song = song.tracks[0];
     
  //     let serGeyss = new MessageEmbed()
  //     .setDescription('К сожалению мне не удалось найти песню! ')
  //     .setColor(embc.emb)
  //     if (!song) return message.channel.send({embeds:[serGeyss]}).catch(() => {});
     
     
  //     let s = {
  //       track: song.track,
  //       name: song.info.title,
  //       stream: song.info.isStream,
  //       author: song.info.author,
  //       time: await format(song.info.length / 1000),
  //       url: song.info.uri,
  //       member: message.member,
  //     };
  //     // console.log(song.tracks + " " + song.track)
  //     // console.log(song.info)
  
  //     let embed = new MessageEmbed()
  //     .setTitle(s.name)
  //     .setURL(s.url)
  //     .setColor(embc.emb)
  //     .setAuthor('Информация о композиции🎵')
  //     .addField(`Автор`,`${s.author}`,true)
  //     .addField(`Название трека`,`${res_one.all[0].title}`,true)
  //     .addField(`Длительность`,`${s.time}`,true)
  //     .addField(`Кол-во просмотров`,`${res_one.all[0].views}`,true)
  //     .addField(`Дата публикации`,`${res_one.all[0].ago}`,true)
  //     .setDescription(`**\`Описание\`: ${res_one.all[0].description}**`)
  //     .setThumbnail("https://cdn.discordapp.com/attachments/782199661766246411/943186420900696074/lovemusic50.png")
  //     .setImage(res_one.all[0].image)
  //     .setTimestamp()
  //     .setFooter(message.author.username,message.author.avatarURL({dynamic:true}))
  //   message.channel.send({ embeds:[ embed ]}).catch(() => {});
  //     if (!q) {
  //       create(message, s, client);
  //     } else {
  //       add(s, q);
  
  //     }
  //   }
  //   if (/https?:\/\/[^ /.]+\.[^ /.]+/g.test(args[0])) {
  //     let playlist = await getSong(`${track}`, client);
      
  //     let serGeys = new MessageEmbed()
  //     .setDescription('К сожалению мне не удалось найти плейлист! ')
  //     .setColor(embc.emb)
  //     if (!playlist) return message.channel.send({embeds:[serGeys]}).catch(() => {});
  //     songs = playlist.tracks;
  //     let serGey = new MessageEmbed()
  //     .setDescription('К сожалению мне не удалось найти песню! ')
  //     .setColor(embc.emb)
  //     if (!songs) return message.channel.send({embeds:[serGey]}).catch(() => {});
  
  //     let bool = songs.length > 1 ? true : false;
  //     let embed;
  //     if (bool) {
  //       let embed = new MessageEmbed()
  //         .setTitle(playlist.playlistInfo.name)
          
  //         .setColor(embc.emb)
  //         .setDescription(
  //           `Вы успешно добавили **${songs.length}** композиций в очередь`
  //         );
  //       message.channel.send({ embeds:[ embed ]}).catch(() => {});
  //     }
  //       if(!track) return message.reply('что-то пошло не так, попробуйте еще раз');
  //       if (!songs) return message.reply('попробуйте еще раз!');
  //     song = songs[0];
  //     if (!song) return message.reply('попробуйте еще раз!');
  //     let s = {
  //       track: song.track,
  //       name: song.info.title,
  //       stream: song.info.isStream,
  //       author: song.info.author,
  //       time: await format(song.info.length / 1000),
  //       url: song.info.uri,
  //       member: message.member,
  //     };
  //     if (!bool) {
  //       console.log(s)
  //       embed = new MessageEmbed()
  //       .setTitle(s.name)
  //       .setURL(s.url)
  //       .setColor(embc.emb)
  //       .setAuthor('Информация о композиции🎵')
  //       .setDescription(`Автор: **${s.author}
  //       Длительность: **${s.stream ? "Прямой эфир" : s.time}**
  //       Канал: **${message.channel.name}`)
  //      .setThumbnail('https://cdn.discordapp.com/attachments/782199661766246411/943186420900696074/lovemusic50.png')
  //       .setTimestamp()
  //       .setFooter(message.author.username)
  //     message.channel.send({ embeds:[ embed ]}).catch(() => {});
  //     }
  //     if (!q) {
  //       await create(message, s, client);
  //     } else {
  //       add(s, q);
  //     }
  //     songs = songs.slice(1);
  //     if (!songs || songs.length < 1) return;
  //     songs.forEach(async (song) => {
  //       q = client.queue.get(message.guild.id);
  
  //       let s = {
  //         track: song.track,
  //         name: song.info.title,
  //         stream: song.info.isStream,
  //         author: song.info.author,
  //         time: await format(song.info.length / 1000),
  //         url: song.info.uri,
  //         member: message.member,
  //       };
  //       if (!bool) {
  //         console.log(s)
  //         embed = new MessageEmbed()
  //     .setTitle(s.name)
  //     .setURL(s.url)
  //     .setColor(embc.emb)
  //     .setAuthor('Информация о композиции🎵')
  //     .setDescription(`Автор: **${s.author}
  //     Длительность: **${s.stream ? "Прямой эфир" : s.time}**
  //     Канал: **${message.channel.name}`)
  //    .setThumbnail('https://cdn.discordapp.com/attachments/782199661766246411/943186420900696074/lovemusic50.png')
  //     .setTimestamp()
  //     .setFooter(message.author.username)
  //   message.channel.send({ embeds:[ embed] }).catch(() => {});
  //       }
  //       add(s, q);
  //     });
  //   }
  
  // }
  //     }
  // }
