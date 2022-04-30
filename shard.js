const { ShardingManager } = require('discord.js');
const manager = new ShardingManager("./index.js",{
    token:"NzM2ODUzMDE5MjgyNjM2ODUx.Xx012Q.7vIvGArrf9pXtihkl_EsWFU-6Qc",
    totalShards:"auto",
    shardList:"auto",
    respawn:true,
});
manager.on('shardCreate', async (shard) => {
console.log(shard.id + " " + "запущен")

});
manager.spawn();