const client = require("../index");
client.voiceMem = new Map();
client.voiceMemory = new Map()
const User = require('../user.js');
const Guild = require('../guild.js');
const Prem = require('../prem.js');
client.queue = new Map();
const { Rest } = require("lavacord");
const Marry = require("../marry.js");
client.on("voiceStateUpdate", async (oldState, newState) => {
   
  let id = oldState ? oldState.id : newState.id;
  let guild = oldState.guild;
  if (!newState.channel && client.voiceMem.get(oldState.id)) {
    let time = Date.now() - client.voiceMem.get(oldState.id).timestamp;
    let marry = await Marry.findOne({users:id,guild:guild.id});
    if (!marry) return;
    let user1 = guild.members.cache.get(marry.user_1)
    let user2 = guild.members.cache.get(marry.user_2)
    if (!user1.voice.channelId || !user2.voice.channelId) return;
    if (user1.voice.channelId != user2.voice.channelId) return;
    marry.voice = marry.voice || 0
    client.voiceMem.delete(oldState.id);
    marry.voice += time;
    marry.save().catch(() => {});
  }
  if (newState.channel && !client.voiceMem.get(newState.id)) {
    client.voiceMem.set(newState.id, { timestamp: Date.now() });
  } 
  });
  
  client.on('voiceStateUpdate', async (oldState, newState) => {

    let userID = oldState ? oldState.id : newState.id;
    let guild = newState.guild.id
    let user = await User.findOne({ userID,guild}) || new User({ userID,guild});
    if (client.voiceMemory.get(userID)) {
      if (!newState.channel) {
        let time = Date.now() - client.voiceMemory.get(userID).timestamp;
        user.voice += time;
        client.voiceMemory.delete(userID);
        await user.save(err => {
          if (err) {
            console.error(`[VoiceOnline_Left] ${err.message}`);
          }
        });
        return;
      }

      // If member is moved to AFK channel (set in guild settings)
      if (newState.channel === oldState.guild.afkChannel) {
        let time = Date.now() - client.voiceMemory.get(userID).timestamp;
        user.voice += time;
        client.voiceMemory.delete(userID);
        await user.save(err => {
          if (err) {
            console.error(`[VoiceOnline_AFK] ${err.message}`);
          }
        });
      }

      // If member is muted by server
      if (newState.serverMute) {
        let time = Date.now() - client.voiceMemory.get(userID).timestamp;
        user.voice += time;
        client.voiceMemory.delete(userID);
        await user.save(err => {
          if (err) {
            console.error(`[VoiceOnline_ServerMute] ${err.message}`);
          }
        });
      }

      // If member is deafened by server
      if (newState.serverDeaf) {
        let time = Date.now() - client.voiceMemory.get(userID).timestamp;
        user.voice += time;
        client.voiceMemory.delete(userID);
        await user.save(err => {
          if (err) {
            console.error(`[VoiceOnline_ServerDeaf] ${err.message}`);
          }
        });
      }

      // If member is muted by self
      if (newState.selfMute) {
        let time = Date.now() - client.voiceMemory.get(userID).timestamp;
        user.voice += time;
        client.voiceMemory.delete(userID);
        await user.save(err => {
          if (err) {
            console.error(`[VoiceOnline_SelfMute] ${err.message}`);
          }
        });
      }

      // If member is deafened by self
      if (newState.selfDeaf) {
        if (client.voiceMemory.get(userID)) {
          let time = Date.now() - client.voiceMemory.get(userID).timestamp;
          user.voice += time;
          client.voiceMemory.delete(userID);
          await user.save(err => {
            if (err) {
              console.error(`[VoiceOnline_SelfDeaf] ${err.message}`);
            }
          });
        }
      }
    }
})

  const config = {
  };
  client.play = async (song, guild) => {
    let q = client.queue.get(guild.id);
    if (!q) return await client.manager.leave(guild.id);
  
    if (!song) {
      q.player.destroy();
      client.manager.leave(guild.id);
      let emb = new MessageEmbed()
      .setDescription(`**Воспроизведение композиции закончилось! <a:arrow_reddotright:943211870511325274>**`)
      q.text.send({embeds:[emb]}).catch(() => { });
      client.queue.delete(guild.id);
      return await client.manager.leave(guild.id);
    };
  
    try {
      let g = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id }) 

      console.log(g.volume)
      q.player.volume(g.volume);
      await q.player.play(song.track);
      q.player.once("error", console.error);
      q.player.once("end", async () => {
        if (q.loop != true) {
          q.songs.shift();
        }
        if (q.loop != true && q.loopQ == true) {
          q.songs.push(song);
        }
        client.play(q.songs[0], guild);
      });//client
    } catch (e) {
  
      client.queue.delete(guild.id);
      await client.manager.leave(guild.id);
      message.channel.send("Ошибка!");
    }
  };
  client.skip = async (guild) => {
    let q = client.queue.get(guild.id);
    if (!q) return;
    q.loop = false;
    await q.player.stop();
  };
  client.on('voiceStateUpdate', async (oldState, newState) => {
    let state = newState || oldState;
    if (
      state.guild.me.voice &&
      state.guild.me.voice.channel &&
      state.guild.members.cache.filter(
        (m) => m.voice.channel == state.guild.me.voice.channel && !m.user.bot
      ).size == 0
      ) {
      client.queue.delete(state.guild.id);
      client.manager.leave(state.guild.id);
      }
      if ((!state.guild.me.voice || !state.guild.me.voice.channel) &&
      client.queue.get(state.guild.id)
      ) {
  
      client.queue.delete(state.guild.id);
      client.manager.leave(state.guild.id);
      }
    
  });
  
  client.on('voiceStateUpdate', async (oldState, newState) => {
		let state = newState || oldState;
		if (newState) var guild = await Guild.findOne({ id: newState.guild.id });
		if (!guild) return;
		config.voice = guild.cv;
		let channel = client.channels.cache.get(guild.cv);
		if (!channel)
			return;

		config.parent = channel.parentId;
		if (!state.guild.me.permissions.has("MOVE_MEMBERS") || !state.guild.me.permissions.has("MANAGE_CHANNELS")) return;
		if (guild.parent5 == null && channel.parent != null) guild.parent5 = channel.parent.id,guild.save().catch(() => { });
		if (!channel.parent) return;
		if (newState.channelId === config.voice) {

			newState.guild.channels.create(newState.member.displayName, {

        type: 'GUILD_VOICE',
				parent: config.parent,
				permissionOverwrites: [
					{
						id: newState.guild.id,
						allow: ['VIEW_CHANNEL'],
					},
					{
						id: newState.member.id,
						allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS','MOVE_MEMBERS'],
					},
          ...newState.channel.parent.permissionOverwrites.cache.values()
				],
			}).then(ch => newState.setChannel(ch));
		}
		if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentId === config.parent && oldState.channelId !== config.voice) oldState.channel.delete().catch(() => { });

	
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	let state = newState || oldState;
	if (newState) var guild = await Guild.findOne({ id: newState.guild.id });

		if (!guild)
			return;
		config.voice = guild.cvc;

		let channel = client.channels.cache.get(guild.cvc);

		if (!channel) return;
    
		if(!guild.parent) return;
		config.parent = channel.parentId;
    
		if (!state.guild.me.permissions.has("MOVE_MEMBERS")) return;
		if (guild.gp2 == null) guild.gp2 = 99,guild.save().catch(() => { });
		if (!channel.parent) return;
		if (newState.channelId === config.voice) {

      newState.guild.channels.create(newState.member.displayName, {
	
        type: 'GUILD_VOICE',
        parent: config.parent,
        permissionOverwrites: [
          {
            id: newState.guild.id,
            allow: ['VIEW_CHANNEL', "SPEAK","CONNECT","STREAM"],
          },
          {
            id: newState.member.id,
            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS'],
          },
          ...newState.channel.parent.permissionOverwrites.cache.values()
        ],
      }).then(ch => newState.setChannel(ch));
  
        }
        if (oldState.channel && !oldState.channel.members.size && oldState.channel.parentId === config.parent && oldState.channelId !== config.voice) oldState.channel.delete().catch(() => { });

});
///////////

