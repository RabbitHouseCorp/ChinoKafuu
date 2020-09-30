const { ShardingManager } = require("discord.js")
const { shard } = require("./config.json")
const shards = new ShardingManager("./index.js", {
	respawn: true,
	totalShards: shard
})

shards.on("shardCreate", (shard) => {
	console.warn(`[SHARDING MANAGER] Launching shard ${shard.id}`)
})

shards.spawn().then(console.warn("[SHARDING MANAGER] Launching shards..."))
