const { ShardingManager } = require("discord.js")
const shards = new ShardingManager("./index.js", {
	respawn: true,
	totalShards: 6
})

shards.on("shardCreate", (shard) => {
	console.warn(`Starting shard: ${shard.id}`)
})

shards.spawn()
